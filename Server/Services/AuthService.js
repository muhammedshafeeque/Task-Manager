const jwt=require('jsonwebtoken')
const { ObjectId } = require('mongodb')
var Collection = require('../Config/Collection')
const db=require("../Config/Connection")
module.exports={
    generateToken:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let token= jwt.sign({ id }, process.env.JWT_TOCKEN_SECRET, {
                expiresIn: "30d",
            })
            try {
                let user=await db.get().collection(Collection.USER_COLLECTION).findOne({_id:ObjectId(id)})
                if(!user.tokens){
                    await db.get().collection(Collection.USER_COLLECTION).updateOne({_id:ObjectId(id)},
                    {
                        $set:{
                            tokens:[token]
                        }
                    })
                    resolve(token)
                }else{
                    await db.get().collection(Collection.USER_COLLECTION).updateOne({_id:ObjectId(id)},
                    {
                        $push:{tokens:token}
                    })
                    resolve(token)
                }
            } catch (error) {
                res.send({error:"Authentication faild"})
            }
            
            
        })

    },
    verifyUser:async(req,res,next)=>{
        
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ){
            
              try {
                  token=req.headers.authorization.split(" ")[1]
              
                  const decoded=jwt.verify(token,process.env.JWT_TOCKEN_SECRET)
                  
                  let user=await db.get().collection(Collection.USER_COLLECTION).findOne({_id:ObjectId(decoded.id)}
                  )
                 
                  if(!user){
                    
                      res.send({error:"Authentication faild Please Login Again  "})
                  }else if(user.tokens.indexOf(token)>-1){
                    
                    req.user=user
                    req.user.token=token
                    next()
                  }else{
                    
                    res.send({error:"Authentication faild Please Login Again  "}) 
                  }
              } catch (error) {
                  
                res.send({error:"Authentication faild Please Login Again  "})
              }
          }else{
            res.send({error:"Authentication faild Please Login Again  "})
          }
    }

}