import * as request from 'request'
import * as config from 'config'


class block{
    private node:string
    
    constructor(){

    }


    /*body
     *{"jsonrpc":"2.0","id":1,"result":1174014,"url":"http://seed2.neo.org:20332"}
     */
    async _getBestNode(){
        console.log('_getBestNode')
        let self = this
        if(self.node){
          return self.node
        }
        return new Promise<string>((resolve, reject) => {
          request(`${config.get('rpc')}`, function (error, response, body) {
            if (error) reject(error) 
            // console.log('_getBestNode:body',body)
            self.node = JSON.parse(body).url
            resolve()
          })
        })

    }

    async getAssetState(assetId){
        const options = {
            method: 'POST',
            url: this.node,
            headers:
            {
              'content-type': 'application/json'
            },
            body: {
              jsonrpc: '2.0', method: 'getassetstate', params: [assetId], id: 1
            },
            json: true
          }
          return new Promise<string>((resolve, reject) => {
            request(options, function (error, response, body) {
              if (error) return reject(error)
              return resolve(body)
            })
          })
    }

    async getBlockCount(){
      try {
        await this._getBestNode()
        const options = {
            method: 'POST',
            url:this.node,
            headers:
            {
              'content-type': 'application/json'
            },
            body: {
              jsonrpc: '2.0', method: 'getblockcount', params: [], id: 1
            },
            json: true
          }
          return new Promise<number>((resolve, reject) => {
            request(options, function (error, response, body) {
              if (error) return reject(error)
              return resolve(body.result)
            })
          }) 
      } catch (error) {
        console.error(error)
      }

    }

    async getBlock(index){
      console.log('getBlock',index)
      try {
        await this._getBestNode()
        const options = {
            method: 'POST',
            url:this.node,
            headers:
            {
              'content-type': 'application/json'
            },
            body: {
              jsonrpc: '2.0', method: 'getblock', params: [index, 1], id: 1
            },
            json: true
          }
          return new Promise<any>((resolve, reject) => {
            request(options, function (error, response, body) {
              if (error) return reject(error)
              return resolve(body.result)
            })
          }) 
      } catch (error) {
        console.error(error)
      }

    }

    async getTxOut(txid,n){
      console.log('getTxOut',txid)
      try {
        await this._getBestNode()
        const options = {
            method: 'POST',
            url:this.node,
            headers:
            {
              'content-type': 'application/json'
            },
            body: {
              jsonrpc: '2.0', method: 'gettxout', params: [txid, n], id: 1
            },
            json: true
          }
          return new Promise<any>((resolve, reject) => {
            request(options, function (error, response, body) {
              if (error) return reject(error)
              return resolve(body.result)
            })
          }) 
      } catch (error) {
        console.error(error)
      }

    }

    async getRawTransaction(txid){
      console.log('getRawTransaction',txid)
      try {
        await this._getBestNode()
        const options = {
            method: 'POST',
            url:this.node,
            headers:
            {
              'content-type': 'application/json'
            },
            body: {
              jsonrpc: '2.0', method: 'getrawtransaction', params: [txid, 1], id: 1
            },
            json: true
          }
          return new Promise<any>((resolve, reject) => {
            request(options, function (error, response, body) {
              if (error) return reject(error)
              return resolve(body.result)
            })
          }) 
      } catch (error) {
        console.error(error)
      }

    }
}




export { block }