import mongoose from 'mongoose'
import { config } from './dotenvConfig'

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI)
    console.log('✅ Connected to MongoDB successfully')
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
