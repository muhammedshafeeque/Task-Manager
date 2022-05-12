import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Constants/Axios";
const TaskContext=createContext()
const TaskProvider=({children})=>{
    const [user,setUser]=useState()
    const [config,setConfig]=useState()
    const navigate=useNavigate()
    useEffect(()=>{
        let userData=JSON.parse(localStorage.getItem('user'))
        if(userData){
            let configs={ headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userData.token}`,
              },}
            axios.get('/api/user/verify-login',configs).then((res)=>{
                if(res.data.error){
                    localStorage.removeItem('user')
                    navigate('/login')
                }else{
                    setUser(res.data)
                    navigate('/')
                }
            })
        }
    },[navigate])
    useEffect(()=>{
        if(user){
            setConfig({headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }})
        }
    },[user])
    return (
        <TaskContext.Provider value={{user,setUser,config,setConfig}} >
            {children}
        </TaskContext.Provider>
    )
}
export default TaskProvider
export const Store=()=>{
    return useContext(TaskContext)
}