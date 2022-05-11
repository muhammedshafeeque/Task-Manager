const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
router.get('/email-exist/:email',userController.chekEmailExist)
router.get('/mobile-exist/:mobile',userController.chekMobileExist)
router.post('/signup',userController.doSignup)
router.post('/login',userController.doLogin)
router.get('/logout/:id',userController.doLogOut)
module.exports=router