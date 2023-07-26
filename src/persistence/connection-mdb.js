import mongoose from 'mongoose';
import 'dotenv/config'
 
export const initMDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connection with MongoDB Atlas database established successfully')
    } catch (err) { console.log(err) }
}