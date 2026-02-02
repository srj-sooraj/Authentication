import express, { json } from "express"
import env from "dotenv"
import connection from "./connections.js"
import router from "./router.js";
import session from "express-session";
import MongoStore from "connect-mongo"
import pkg from "jsonwebtoken"


env.config()

const app = express()

// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized:false,
//     store:MongoStore.create({
//         mongoUrl:process.env.MONGO_URI+"sessions"
//     }),
//     cookie:{
//         httpOnly:true,
//         maxAge:1000*60
//     }
// }))


app.use(express.json());
app.use(express.static("../fontend"));
app.use("/api", router);

connection()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`server started at http://localhost:${process.env.PORT}`);
            
        })
    })
    .catch((err)=>{
        console.log(err);
        
    })