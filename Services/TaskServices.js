const { ObjectId } = require("mongodb");
const Collection = require("../Config/Collection");
const db=require('../Config/Connection')
module.exports={
    fetchTasks:(user)=>{

        return new Promise(async(resolve,reject)=>{
            let tasks = await db
          .get() 
          .collection(Collection.TASK_COLLECTION)
          .find({ userId:ObjectId(user._id) })
          .sort({time:1})
          .toArray();
          let dateSort=tasks.sort(function(a, b) {
              return a.date.localeCompare(b.date)
          });
          let  statusSort=dateSort.sort(function(a, b) {
              return a.status.localeCompare(b.status)
          });
        
        resolve(statusSort)
        })
    }
}