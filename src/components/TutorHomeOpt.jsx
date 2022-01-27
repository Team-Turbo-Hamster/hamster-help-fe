import React from "react";
import { Button, Typography } from "@mui/material";
import useStyles from "../styles/components/homeOptions.styles";
import { useNavigate } from "react-router-dom";

const TutorHomeOpt = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Button variant="outlined" className={classes.button}>
        Jump right in
      </Button>
      <Button
        onClick={() => navigate("/queue")}
        variant="outlined"
        className={classes.button}
      >
        View Queue
      </Button>
      <Typography variant="body1">5 tickets currently in the queue</Typography>
    </div>
  );
};

export default TutorHomeOpt;