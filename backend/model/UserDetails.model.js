import mongoose from "mongoose";


const userDetailsSchema = new mongoose.Schema({
    fullname:{type:String},
    phone:{type:String},
    email:{type:String},
    profile:{type:String},
    userId:{type:String}
})

export default mongoose.model("UserDetails",userDetailsSchema)