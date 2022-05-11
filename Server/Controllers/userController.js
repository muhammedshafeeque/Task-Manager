const db=require("../Config/Connection")
const Collection = require("../Config/Collection")
const bcrypt=require('bcrypt')
const AuthService=require("../Services/AuthService")
module.exports={
    chekEmailExist:async(req,res)=>{
        try {
            let user=await db.get().collection(Collection.USER_COLLECTION).findOne({email:req.params.email})
            if(user){
                res.send({error:"Email Already Exist "})
            }else{
                res.send()
            }
        } catch (error) {
            res.send({error:'Email Cheking Faild'})
        }
       
    },
    chekMobileExist:async(req,res)=>{
        try {
            let user=await db.get().collection(Collection.USER_COLLECTION).findOne({mobile:req.params.mobile})
            if(user){
                res.send({error:"Mobile Number  Already Exist "})
            }else{
                res.send()
            }
        } catch (error) {
            res.send({error:'Mobile Number Cheking Faild'})
        }
    },
    doSignup:async(req,res)=>{
        const {name,email,dob,mobile,password,photo}= req.body
   
        if(!name||!email||!dob||!mobile||!password){
            res.send({error:"All Fields Required"})
        }else{

                let Exist=await db.get().collection(Collection.USER_COLLECTION).findOne({email:email})
                if(Exist){
                    res.send({error:"Email already Exist "})
                }else{
                    Exist=await db.get().collection(Collection.USER_COLLECTION).findOne({mobile:mobile})
                    if(Exist){
                        res.send({error:"mobile alredy Exist"})
                    }else{
                        try {
                            let encrypted_password=await bcrypt.hash(password, 10)
                            let user={name,email,dob,mobile,photo, password:encrypted_password ,created_Date:new Date()}
                            await db.get().collection(Collection.USER_COLLECTION).insertOne(user)
                            let token=await AuthService.generateToken(user._id)
                            res.send({name,email,mobile,photo,dob,token})
                            } catch (error) {
                                res.send({error:"Signup Faild"})
                            }
                    }
                }
            
        
            
        }  
    },
    doLogin:async(req,res)=>{
        const {email,password}=req.body
     
        if(!email||!password){
            res.send({error:"email and Password must be enter"})
        }else{
            try {
                let user=await db.get().collection(Collection.USER_COLLECTION).findOne({email:email})
               
                if(!user){
                    res.send("No user Found")
                }else{
                    bcrypt.compare(password,user.password).then(async(status)=>{
                        if(!status){
                            res.send({error:"Email or Password does not Match "})
                        }else{
                            let token=await AuthService.generateToken(user._id)

                            res.send({name:user.name,email:user.name,dob:user.dob,mobile:user.mobile,photo:user.photo,token})
                        }
                    })
                }
            } catch (error) {
                
            }
        }
    },
    doLogOut:(req,res)=>{

    }
}