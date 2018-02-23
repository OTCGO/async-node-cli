import { mongoose } from '../lib'

const baseSchema = {
  hash: String,
  size: Number,
  version: Number,
  previousblockhash: String,
  merkleroot: String,
  time: Number,
  index: { type: 'Number', unique: true, required: true, default:0 },
  nonce: String,
  nextconsensus: String,
  script: {
    invocation: String,
    verification: String
  },
  tx: [],
  confirmations: Number,
  nextblockhash: String
}

const block = new mongoose.Schema(baseSchema, {
  collection: 'neo_m_blocks',
  strict: false
})


const Block = mongoose.model('Block', block)



export { Block }