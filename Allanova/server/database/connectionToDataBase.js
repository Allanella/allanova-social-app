import mongoose from "mongoose";


export const connectToDataBase = async () => {

    try {
        const connection  = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connection was successful: ${connection.connection.host}`)
        
    } catch(error){
        console.log(`Error connecting to database: ${error.message}`)
    }
}