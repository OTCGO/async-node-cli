/**
 * Filename: /Users/wei/Desktop/otcgo/async-node-cli/src/app.ts
 * Path: /Users/wei/Desktop/otcgo/async-node-cli
 * Created Date: Wednesday, February 14th 2018, 11:40:20 pm
 * Author: qknow
 * 
 * Copyright (c) 2018 otcgo.cn
 */

import * as log4js from 'log4js'
import * as config from 'config'
import * as async from 'async'
import { block } from './lib'
import { Block } from './models'
import { Transaction } from './models'


log4js.configure(config.get('log'))

let workerCount = 1000



//0xa95159990259b48bcdb3439c5436305b4536895f9b0e81d175de3f6f0a01b699

let queue = async.queue(function (task, callback) {
    let b = new block()
    task().then((block) => {

        new Block(block).save().then(() => {
            block.tx.forEach(async (tx) => {

                tx.blockIndex = block.index
                for (let i = 0; i < tx.vin.length; i++) {
                    let result: any = await b.getRawTransaction(tx.vin[i].txid)
                    Object.assign(tx.vin[i], { utxo: result.vout[tx.vin[i].vout] })
                }
                // console.log('tx2',tx)
                new Transaction(tx).save().catch(() => { })
            });

            callback()
        }).catch(() => { })

    })
}, workerCount);



function main() {
    new block().getBlockCount().then(count => {
        // console.log('count',count)
        Block.findOne({}).sort({ index: -1 }).then(block => {

            // storeBlock
            setInterval(() => {
                if (block) { 
                    let blockWritePointer = block.index || 0
                    while (blockWritePointer < (count - 1)) {
                        blockWritePointer++
                        storeBlock(blockWritePointer)
                        console.log('main', `${blockWritePointer}/${count}`)
                        // console.log(block.index + 1 )
                    }
                } else {
                    storeBlock(0)
                }

            }, 20000)



            //verifyBlocks
            setInterval(() => {
                if (block.index > 0) {
                    verifyBlocks(block.index+1, (count - 1))
                } else {
                    verifyBlocks(1, (count - 1))
                }

            }, 180000)
        })




    })
}



function storeBlock(index) {
    //console.log('storeBlock',index)
    queue.push(() => {
        return new Promise((resolve, reject) => {
            new block().getBlock(index).then((block) => {
                resolve(block)
            }).catch(err => {
                reject(err)
            })
        })
    })
}


// storeBlock(1174543)


function verifyBlocks(start, end) {
    let pointer = start - 1
    let stream = Block.find({ index: { $gte: start, $lte: end } }, 'index').sort({ index: 1 }).cursor()
    stream.on('data', (d) => {
        while (true) {
            pointer++
            console.log('d', d.index === pointer)
            if (d.index === pointer) {
                break
            } else {
                storeBlock(pointer)
            }
        }
    })
    stream.on('end', () => {
        console.log('end')
    })
}

main()

