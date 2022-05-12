const express=require('express')
const { verifyUser } = require('../Services/AuthService')
const router=express.Router()
const userController=require('../Controllers/userController')
router.get('/email-exist/:email',userController.chekEmailExist)
router.get('/mobile-exist/:mobile',userController.chekMobileExist)
router.post('/signup',userController.doSignup)
router.post('/login',userController.doLogin)
router.get('/logout/',verifyUser,userController.doLogOut)
router.get('/logout-all', verifyUser,userController.logOutAll)
router.get('/verify-login',verifyUser,userController.getLoginedData)

module.exports=router