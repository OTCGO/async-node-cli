import { mongoose } from '../lib'
import * as timestamps from 'mongoose-timestamp'


const baseSchema = {
  address: String
}

const address = new mongoose.Schema(baseSchema, {
  collection: 'neo_m_addresses',
  strict: false
})

address.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

const Address = mongoose.model('Address', address)



export { Address }