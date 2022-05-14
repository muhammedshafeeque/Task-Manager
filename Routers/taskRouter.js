const express=require('express')
const router=express.Router()
const taskControler=require('../Controllers/taskController')
router.post('/create',taskControler.createTask)
router.get('/fetch-tasks',taskControler.getAllTasks)
router.get('/finish/:id',taskControler.finishTask)
router.get('/delete/:id',taskControler.reMoveTask)
module.exports=router