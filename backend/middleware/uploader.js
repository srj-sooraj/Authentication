import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination:'./uploads',
    filename:function(req,file,cb){
        const uniquesuffix = Date.now()+'-'+Math.round(Math.random() * 1E6)
        cb(null,path.parse(file.originalname).name + '-'+ uniquesuffix+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

export default upload;