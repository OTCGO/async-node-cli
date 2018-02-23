import { mongoose } from '../lib'
import * as timestamps from 'mongoose-timestamp'



const baseSchema = {
    version: Number,
    assetId: { type: 'String', unique: true, required: true },
    type: String,
    name: [],
    amount: String,
    available: String,
    precision: Number,
    owner: String,
    admin: String,
    issuer: String,
    expiration: Number,
    frozen: false,
    nep5:{
      totalSupply: String,  // totalSupply
      name: String,  // name
      symbol: String,  // symbol
      contract: String,  // contract
    }
}

const asset = new mongoose.Schema(baseSchema, {
  collection: 'neo_m_assets',
  strict: false
})

asset.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})


const Asset = mongoose.model('Asset', asset)



export { Asset }