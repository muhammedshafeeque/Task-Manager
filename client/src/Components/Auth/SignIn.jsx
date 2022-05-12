import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "../../Constants/Axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Context/Store";

function SignIn() {
  //========= Component Controles=======
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = Store();
  // ==========Form data=========
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //======== Functions========
  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Error.",
        description: "All Fields Required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      setloading(true);
      let { data } = await axios.post("/api/user/login", { email, password });
      if (data.error) {
        setloading(false)
        toast({
          title: "Error.",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setloading(false);
        navigate("/");
      }
    }
  };
  return (
    <div>
      <FormControl mt={2} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={"email"}
        />
      </FormControl>

      <FormControl mt={2} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={"password"}
        />
      </FormControl>

      <Button
        width={"100%"}
        onClick={handleSubmit}
        colorScheme="blue"
        isLoading={loading}
        mt={5}
      >
        Sign In
      </Button>
    </div>
  );
}

export default SignIn;
