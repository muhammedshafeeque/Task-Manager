const { ObjectId } = require("mongodb");
const Collection = require("../Config/Collection");
const db = require("../Config/Connection");
const { fetchTasks } = require("../Services/TaskServices");

module.exports = {
  createTask: async (req, res) => {
    const { title, date, time, note } = req.body;
    if (!title || !date || !time) {
      res.send({ error: "All Fields required" });
    } else {
      try {
        await db
          .get()
          .collection(Collection.TASK_COLLECTION)
          .insertOne({
            title,
            date,
            time,
            note,
            userId: req.user._id,
            status: "active",
          });
          let tasks=await fetchTasks(req.user)
          res.send(tasks) 
      } catch (error) {
        res.send({ error: "Task adding faild" });
      }
    }
  },
  getAllTasks: async (req,res) => {
    try {
        let tasks=await fetchTasks(req.user)
        res.send(tasks) 
    } catch (error) {
      res.send({ error: "Task Fetching faild" });
    }
  },
  finishTask:async(req,res)=>{
    let task=req.params.id
    await db.get().collection(Collection.TASK_COLLECTION).updateOne({_id:ObjectId(task)},
    {
        $set:{
            status:"clossed"
        }
    })
    let tasks=await fetchTasks(req.user)
    res.send(tasks) 
  },
  reMoveTask:async(req,res)=>{
    let task=req.params.id
    await db.get().collection(Collection.TASK_COLLECTION).deleteOne({_id:ObjectId(task)})
    let tasks=await fetchTasks(req.user)
    res.send(tasks) 
  }
  
};
