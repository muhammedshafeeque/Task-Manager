const  express= require("express")
const dotenv=require("dotenv")
const UserRouter=require('./Routers/UserRouter')
const db=require('./Config/Connection')
const cors=require('cors')
dotenv.config()
const app=express()

app.use(cors())
app.use(express.json())
db.connect((err) => {
    if (err) console.log("connection Error" + err);
    else console.log("Database Connected");
  });
app.use('/api/user',UserRouter)
const Server=app.listen(process.env.PORT||5000,()=>{
    console.log("server is Running ")
})