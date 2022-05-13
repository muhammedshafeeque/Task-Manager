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
} from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from '../../Constants/Axios'
import { Store } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
function LogoutPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {config,setUser}=Store()
  const navigate=useNavigate()
  const handleLoguot=async()=>{
    axios.get('/api/user/logout',config).then((res)=>{
      localStorage.removeItem('user')
      setUser(null)
      navigate('/login')
    })
  }
  const handleAllLogout=async()=>{
    axios.get('/api/user/logout-all',config).then((res)=>{
      setUser(null)
      localStorage.removeItem('user')
      navigate('/login')
    })
  }
  return (
    <div>
      <Text minWidth={"200px"}  onClick={onOpen}>Logout</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do You Want Logout ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box display={'flex'}>
              <Button onClick={handleLoguot} colorScheme={'pink'}>Logout from this Divice </Button>
                <Button onClick={handleAllLogout} colorScheme={'red'} ml={2}>Logout from All Divices </Button>
              </Box>
                

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LogoutPopup;
