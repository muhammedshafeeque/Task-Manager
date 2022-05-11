import React from "react";
import { Container, Box, Text, TabList, Tab, TabPanels, TabPanel, Tabs } from "@chakra-ui/react";
import "./Login.scss";
import SignIn from "../../Components/Auth/SignIn";
import Signup from "../../Components/Auth/Signup";
function LoginPage() {
  return (
    <div>
      <Container max='xxl' centerContent>
        <Box mt={10} className="login_header">
          <Text className="text">Task Manager</Text>
        </Box>

        <Box mt={10} className="login_area">
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab width={'50%'} >Sign In</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
