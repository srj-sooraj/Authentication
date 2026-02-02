import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})

export default mongoose.model("user",userSchema)