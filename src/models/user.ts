import mongoose from 'mongoose'

export interface UserPayload {
  name: string
  username: string
  password?: string
}

const schema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String }
})

export default mongoose.model('User', schema)
