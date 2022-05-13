import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import './View.scss'
import { Store } from "../../Context/Store";
import axios from '../../Constants/Axios'
function VewTask({ children,task }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {config,setTasks} =Store()
  const toast=useToast()
  const handleRemove=async()=>{
      let {data}=await axios.get(`/api/task/delete/${task._id}`,config)
      if(data.error){
        toast({
            title: 'Faild',
            description: data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
      }else{
        setTasks(data)
        toast({
            title: 'Task Removed Successfully ',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

          onClose()
      }
  }
  const handleFinish=async()=>{
    let {data}=await axios.get(`/api/task/finish/${task._id}`,config)
    if(data.error){
      toast({
          title: 'Faild',
          description: data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    }else{
      setTasks(data)
      toast({
          title: 'Task updated  Successfully ',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        onClose()
    }
  }
  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{task.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box className="task_time" >
                  <Text>Time: {task.time}</Text>
                  <Text>Date:  {task.date}</Text>
              </Box>
              <Text mt={5}>Note :</Text>
                <Box className="notes">
                    <Text>{task.note}</Text>
                </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemove} >
              Delete
            </Button>
            {task.status==="active"?<Button colorScheme="green" mr={3} onClick={handleFinish}>
              Finish
            </Button>:""}
            
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VewTask;
