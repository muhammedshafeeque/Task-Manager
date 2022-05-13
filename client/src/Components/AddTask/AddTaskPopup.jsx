import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,

} from "@chakra-ui/react";
import axios from "../../Constants/Axios"
import { Store } from "../../Context/Store";

function AddTaskPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title,setTitle]=useState(null)
  const [date,setDate]=useState()
  const [time,setTime]=useState()
  const [nots,setNots]=useState()
  const {config,setTasks}=Store()
  const toast =useToast()
  const manageSubmit=async()=>{
      if(!title||!date||!time){
        toast({
            title: "All field Required",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
      }else{
         let {data}= await axios.post('/api/task/create',{title,time,date,note:nots},config)
         if(data.error){
            toast({
                title: "Error",
                description:data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
         }else{
             setTasks(data)
             toast({
                title: "Task Added Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });

              onClose()
         }
      }
    
  }
  return (
    <div>
      <Button colorScheme={"blue"} onClick={onOpen}>
        + Add Task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={(e)=>{
                setTitle(e.target.value)
            }} placeholder="Task" />
            <Input mt={3} onChange={(e)=>{
                setDate(e.target.value)
            }} type={"date"} />
            <Input onChange={(e)=>{
                setTime(e.target.value)
            }} mt={3} type={"time"} />
            <Textarea onChange={(e)=>{
                setNots(e.target.value)
            }} mt={3} type="text" placeholder="Notes" />
            <Button onClick={manageSubmit} mt={5} colorScheme="blue" width={"100%"}>
              Add
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddTaskPopup;
