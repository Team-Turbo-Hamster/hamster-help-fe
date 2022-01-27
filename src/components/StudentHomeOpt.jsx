import React from "react";
import { Button } from "@mui/material";
import useStyles from "../styles/components/homeOptions.styles";
import { useNavigate } from "react-router-dom";

const StudentHomeOpt = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Button
        onClick={() => navigate("/new-ticket")}
        variant="outlined"
        className={classes.button}
      >
        Create a Ticket
      </Button>
      <Button
        onClick={() => navigate("/queue")}
        variant="outlined"
        className={classes.button}
      >
        Open Queue
      </Button>
      <Button variant="outlined" className={classes.lastButton}>
        Open Stack
      </Button>
    </div>
  );
};

export default StudentHomeOpt;