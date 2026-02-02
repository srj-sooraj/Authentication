import { Router } from "express";
import * as rh from './requestHandler.js'
import Auth from './middleware/Auth..js'
import upload from './middleware/uploader.js'
import path from 'path'
const router = Router()

router.post('/signup',rh.signup)
router.post('/signin',rh.signin)
router.post('/signout',rh.logout)
router.get('/home',Auth,rh.home)
router.route('/profile').get(Auth,rh.profile)
router.route('/getdetails').get(Auth,rh.getDetails)
router.route('/upload').post(Auth,upload.single('file'),rh.addDetails)
router.route('/editdetails').put(Auth,upload.single('file'),rh.editDetails)
router.route('/deletedetails').delete(Auth,rh.deleteDetails)


router.route('/image/:filename').get((req,res)=>{
    const {filename} = req.params;
    return res.sendFile(path.resolve(`./uploads/${filename}`))
})

export default router;