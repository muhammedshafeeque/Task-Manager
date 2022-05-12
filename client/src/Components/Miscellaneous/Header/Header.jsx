import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Store } from "../../../Context/Store";
import "./Header.scss";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LogoutPopup from "../../Auth/LogoutPopup";
function Header() {
  const { user } = Store();

  return (
    <Box className="header">
      {/* <Box width={"15rem"}></Box> */}
      <Text className="header_text">Task Manager</Text>
      <Box className="profile">
        <Text mr={3}>{user ? user.name : ""}</Text>
        <Stack direction="row">
          <Avatar name="Oshigaki Kisame" src={user ? user.photo : ""} />
        </Stack>
        <Menu>
          <MenuButton bgColor={"white"} as={Button} rightIcon={ <ChevronDownIcon />}>
            
          </MenuButton>
          <MenuList>
            <MenuItem><LogoutPopup/></MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;
