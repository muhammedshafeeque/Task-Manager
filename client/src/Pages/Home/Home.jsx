import { Box,  Container } from "@chakra-ui/react";
import React, { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskPopup from "../../Components/AddTask/AddTaskPopup";
import Header from "../../Components/Miscellaneous/Header/Header";
import TaskTable from "../../Components/Miscellaneous/TaskTable/TaskTable";
import { Store } from "../../Context/Store";
import "./Home.scss";

function Home() {
  const {user}=Store()
  const navigate=useNavigate()

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[navigate,user])
  return (
    <div>
      <Header />
      <Box className="home">
        <Container centerContent>
          <Box className="todo_input_area">
           
            <AddTaskPopup />
          </Box>

          <Box className="task_table_area" >
            <TaskTable  />
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Home;
