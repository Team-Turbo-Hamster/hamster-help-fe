import { useState } from "react";
import {
  Avatar,
  Box,
  Tooltip,
  Menu,
  IconButton,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";
import useAuth from "../contexts/useAuth";
import { Link } from "react-router-dom";
import { useColorMode } from "../styles/theme";
import useStyles from "../styles/components/settings-menu-drawer";
import { Image } from "cloudinary-react";

const SettingsMenu = (setOpenDrawer) => {
  const { toggleColorMode, mode } = useColorMode();
  const { signOut, user } = useAuth();

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <List>
        <ListItem className={classes.avatarContainer}>
          <Avatar>
            <Image
              width="100%"
              cloudName="turbo-hamster"
              publicId={user.avatar}
            />
          </Avatar>
        </ListItem>
        <ListItem onClick={toggleColorMode} className={classes.menuItem}>
          {mode === "light" ? "Dark mode" : "Light mode"}
        </ListItem>
      </List>
      <Link
        // onClick={() => setOpenDrawer(false)}
        state={{ user_id: user._id }}
        to="/my-profile"
        className={classes.linkItem}
      >
        <ListItem className={classes.menuItem}>My Profile</ListItem>
      </Link>
      <ListItem className={classes.menuItem} onClick={signOut}>
        Sign Out
      </ListItem>
    </Box>
  );
};

export default SettingsMenu;