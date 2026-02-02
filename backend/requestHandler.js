import fs from 'fs'
import path from 'path'
import userSchema from "./model/User.model.js"
import userDetailsSchema from "./model/UserDetails.model.js"
import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken'
const{sign}=pkg 
export async function signup(req,res) {
    try {
        const {username,password,cpassword} = req.body;
        console.log(username,password);
        
        
        if(!(username&&password&&cpassword))
            return res.status(400).json({msg:'All fields are required',ok:false})
        
        const user = await userSchema.findOne({username})
        if(user)
            return res.status(400).json({msg:'user already exists!',ok:false}) 

        if(cpassword!==password)
             return res.status(400).json({msg:'password mismatch',ok:false})

        const hashedpsd =await bcrypt.hash(password,10)
        console.log(hashedpsd);
        const data = await userSchema.create({username,password:hashedpsd})
        return res.status(201).json({msg:'registered',ok:true})
        
    } catch (error) {
        return res.status(500).json({msg:'internal server error',ok:false})
    }
}


export async function signin(req,res) {
    try {
        const {username,password} = req.body;
        console.log(username,password);
        
        
        if(!(username&&password))
            return res.status(400).json({msg:'All fields are required',ok:false})
        
        const user = await userSchema.findOne({username})
        if(!user)
            return res.status(400).json({msg:'username does not  exists!',ok:false}) 

        const isEqual = await bcrypt.compare(password, user.password)
        
        if(!isEqual)
            return res.status(400).json({msg:'Invalid credentials'})

        const token = await sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
        console.log(token);
        return res.status(201).json({msg:'success',ok:true,token})

        // return res.status(201).json({msg:'success',ok:true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
    }
}

export async function home(req,res) {
    try {
       console.log(req.user.userId,'from home-------');
       const userId = req.user.userId
       if(!userId)
        return res.status(200).json({msg:'not logged in',ok:false})
       const user = await userSchema.findOne({_id:userId},{password:0})
       const UserDetails = await userDetailsSchema.findOne({userId})
         return res.status(200).json({msg:'success',ok:true,user,UserDetails})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
    }
}


export async function logout(req,res) {
    try {
        req.session.destroy((err)=>{
            if(err) return res.send('Error in logging out')
            res.clearCookie('connect.sid')
            return res.status(200).json({msg:'Logged out successful',ok:true})
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
    }
}


export async function profile(req,res) {
    try {
      
       
       const user = await userSchema.findOne({_id:req.user.userId},{password:0})
         return res.status(200).json({msg:'success',ok:true,user})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
    }
}

export async function addDetails(req,res) {
    try {
        const {fullname,phone,email} = req.body;
        const profile = req.file.filename;
        console.log(fullname,phone,email,profile);
        const data = await userDetailsSchema.create({fullname,phone,email,profile,userId:req.user.userId})
        console.log(data);
        
         return res.status(200).json({msg:'success',ok:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
        
    }
}

export async function getDetails(req,res) {
    try {
        const userId = req.user.userId
        const userDetails = await userDetailsSchema.findOne({userId})
         return res.status(200).json({msg:'success',ok:true,userDetails})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
        
    }
}


export async function editDetails(req,res) {
    try {
        const {fullname,phone,email} = req.body;
        const profile = req.file.filename;
        console.log(fullname,phone,email,profile);
        const userId = req.user.userId
        const OldDetails = await userDetailsSchema.findOne({userId})
        fs.unlinkSync(path.resolve(`./uploads/${OldDetails.profile}`))
        const data = await userDetailsSchema.updateOne({userId},{$set:{fullname,phone,email,profile}})
        console.log(data);
        
         return res.status(200).json({msg:'success',ok:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
        
    }
}

export async function editDetailstext(req,res) {
    try {
        const {fullname,phone,email} = req.body;
        const profile = req.file.filename;
        console.log(fullname,phone,email);
        const userId = req.user.userId
        const OldDetails = await userDetailsSchema.findOne({userId})
        fs.unlinkSync(path.resolve(`./uploads/${OldDetails.profile}`))
        const data = await userDetailsSchema.updateOne({userId},{$set:{fullname,phone,email}})
        console.log(data);
        
         return res.status(200).json({msg:'success',ok:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'internal server error',ok:false})
        
    }
}

export async function deleteDetails(req,res) {
    try {
        const userId = req.user.userId
        const details = await userDetailsSchema.findOne({ userId })
        if (!details) {
            return res.status(404).json({msg: "No profile found",ok: false })
        }

        if (details.profile) {
            const imagePath = path.resolve(`./uploads/${details.profile}`)

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }
        await userDetailsSchema.deleteOne({ userId })

        return res.json({msg: "Profile deleted", ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error", ok: false})
    }
}