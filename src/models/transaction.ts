import { mongoose } from '../lib'




const baseSchema = {
  txid: { type: 'String', unique: true, required: true, index: true },
  size: Number,
  type: { type: 'String', index: true }, // 
  version: Number,
  attributes: [],
  vin: [{
    vout: Number,
    txid: String,
    utxo: {}
  }],
  vout: [],
  sys_fee: Number,
  net_fee: Number,
  blockIndex: { type: 'Number', index: true },
  scripts: [],
  script: String,
  nep5: {
    name: String,
    symbol: String,
    value: String,
    operation: String,
    contract: String
  }
}

const transaction = new mongoose.Schema(baseSchema, {
  collection: 'neo_m_transactions',
  strict: false
})


const Transaction = mongoose.model('Transaction', transaction)



export { Transaction }