import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://pabloalvarez4284:admin4284@personalcluster.5dvocjj.mongodb.net/?retryWrites=true&w=majority'

try {
    await mongoose.connect(connectionString)
    console.log('Connection with MongoDB Atlas database established successfully')
} catch (err) {
    console.log(err)
}