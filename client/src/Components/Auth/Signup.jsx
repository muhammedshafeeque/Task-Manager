import {
  Button,
  FormControl,
  FormLabel,
  Img,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import axios from "../../Constants/Axios";
import "./auth.scss";
import {useNavigate} from 'react-router-dom'
function Signup() {
  //======== component Controlls==========
  const [message, setMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const navigate=useNavigate()
  //=========== form data =============
  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [photo, setPhoto] = useState();
  const [password, setPassword] = useState();
  //======== functions===========

  const handleEmail = async (e) => {
    // verifying the  Email address and cheking this email already exist
    setloading(true);
    if (e.target.value.length > 0) {
      if (EmailValidator.validate(e.target.value)) {
        let { data } = await axios.get(
          `/api/user/email-exist/${e.target.value}`
        );
        if (data.error) {
          setMessage("Email adress already Exist");
          setloading(false);
        } else {
          setEmail(e.target.value);
          setMessage(null);
          setloading(false);
        }
      } else {
        setMessage("Pleas Enter A valid Email Address");
        setloading(false);
      }
    } else {
      setMessage(null);
      setEmail(null);
      setloading(false);
    }
  };
  const handleMobile = async (e) => {
    //verifying Mobile Number
    if (e.target.value.length > 9) {
      setloading(true);
      let { data } = await axios.get(
        `/api/user/mobile-exist/${e.target.value}`
      );
      if (data.error) {
        setMessage(data.error);
        setloading(false);
      } else {
        setMobile(e.target.value);
        setMessage(null);
        setloading(false);
      }
    } else {
      if (e.target.value.length < 1) {
        setMessage(null);
        setMobile(null);
      } else {
        setMessage("Pleas Enter A valid Mobile Number");
      }
    }
  };

  const handlePassword = (e) => {
    if (e.target.value.length < 8) {
      if (e.target.value.length < 1) {
        setMessage(null);
      } else {
        setMessage("password must have minimum 8 letters");
      }
    } else {
      setPassword(e.target.value);
      setMessage(null);
    }
  };
  const handleImage = async (e) => {
    let pic = e.target.files[0];
    setloading(true);
    if (pic === undefined) {
      toast({
        title: "Pleas choos an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    } else if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "taskManager");
      data.append("cloud_name", "crapee");
      fetch("https://api.cloudinary.com/v1_1/crapee/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Pleas choos an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
  };

  const handleSubmit=async()=>{
      if(!name||!email||!mobile||!password||!dob){
        toast({
            title: 'Error.',
            description: "All Fields Required",
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top'
          })
      }else{
          let {data}=await axios.post('/api/user/signup',{name,email,mobile,password,dob,photo})
          if(data.error){
            toast({
                title: 'Error.',
                description: data.error,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top'
              })
          }else{
              localStorage.setItem('user',JSON.stringify(data))
              toast({
                title: 'User Registerd Successfully ',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'bottom'
              })
              navigate('/')
          }
      }
  }
  return (
    <div>
      <FormControl mt={2} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type={"text"}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel>Date Of Birth</FormLabel>
        <Input
          placeholder="Date Of Birth"
          onChange={(e) => {
            setDob(e.target.value);
          }}
          type={"date"}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={handleEmail} type={"email"} />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          placeholder="Mobile Number"
          onChange={handleMobile}
          type={"number"}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          onChange={handlePassword}
          type={"password"}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel>Photo</FormLabel>
        <Input
          pl={0}
          accept="image/*"
          onChange={handleImage}
          height={"100%"}
          placeholder="Password"
          type={"file"}
        />
      </FormControl>
      {photo && <Img className="profile_image" mt={3} src={photo} />}

      {message && (
        <Text textAlign={"center"} color="red" mt={3}>
          {message}
        </Text>
      )}
      <Button width={"100%"} onClick={handleSubmit} colorScheme="blue" isLoading={loading} mt={5}>
        Signup
      </Button>
    </div>
  );
}

export default Signup;
