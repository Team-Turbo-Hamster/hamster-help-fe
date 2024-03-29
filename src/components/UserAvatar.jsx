import React from "react";
import { Avatar, Badge } from "@mui/material";
import { Image } from "cloudinary-react";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserAvatar = ({ className, publicId, online }) => {
  return (
    <>
      {online ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="user avatar" className={className}>
            {
              <Image
                cloudName="turbo-hamster"
                publicId={publicId}
                width="100%"
              />
            }
          </Avatar>
        </StyledBadge>
      ) : (
        <Avatar alt="user avatar" className={className}>
          {<Image cloudName="turbo-hamster" publicId={publicId} width="100%" />}
        </Avatar>
      )}
    </>
  );
};

export default UserAvatar;
