const jwt=require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const Collection = require('../Config/Collection')
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

    }

}