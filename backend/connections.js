import mongoose from "mongoose";
export default function connection(){
    try {
        const db = mongoose.connect(process.env.MONGO_URI+process.env.DB_NAME)
        console.log('Database connected');

        return db
        
    } catch (error) {
     console.log(error);
        
    }
}