import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function SignIn() {
 
//========= Component Controles=======
const toast=useToast()
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()
// ==========Form data=========
const [email,setEmail]=useState()
const [password,setPassword]=useState()
//======== Functions========
  const handleSubmit= async()=>{
    if(!email||!password){
      toast({
        title: 'Error.',
        description: "All Fields Required",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'top'
      })
    }else{
      setloading(true)
      let {data}=await axios.post('/api/user/login',{email,password})
      if(data.error){
        toast({
          title: 'Error.',
          description:data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:'top'
        })
    }else{
      setloading(false)
      navigate('/')
    }
    }
  }
  return (
    <div>
      
 
      <FormControl mt={2} isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={(e)=>{
          setEmail(e.target.value)
        }} type={"email"} />
      </FormControl>
     
      <FormControl mt={2} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          type={"password"}
        />
      </FormControl>
      
      <Button width={"100%"} onClick={handleSubmit} colorScheme="blue" isLoading={loading} mt={5}>
        Signup
      </Button>
    </div>
  )
}

export default SignIn