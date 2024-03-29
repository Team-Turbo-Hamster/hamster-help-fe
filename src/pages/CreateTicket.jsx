import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Container,
  Alert,
  Button,
  OutlinedInput,
  Switch,
  FormGroup,
  FormControlLabel,
  Chip,
  Paper,
  ListItem,
} from "@mui/material";
import useStyles from "../styles/pages/new-ticket.styles";
import useAuth from "../contexts/useAuth";
import { createTicket } from "../utils/ticketRequests";
import ChipArray from "../components/ChipArray";
import { SocketContext } from "../contexts/socket";
import CardWrap from "../components/CardWrap";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [images, setImages] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vuejs" },
  ]);

  const socket = useContext(SocketContext);
  const { user } = useAuth();

  const classes = useStyles();
  const navigate = useNavigate();

  //TODO: change this
  const handleTagClick = (data) => {
    tagsInput.includes(data) ? (
      <></>
    ) : (
      setTagsInput(tagsInput.concat(" ", data))
    );

    validateTicket();
  };

  console.log(tagsInput);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImages((prevState) => [...prevState, reader.result]);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const tagCount = () => {
    let test = new RegExp(/^(\s*\w+\b){2,6}$/);
    return test.test(tagsInput) ? (
      <></>
    ) : (
      <Alert severity="warning">We recommend between 2-6 tags.</Alert>
    );
  };

  const validateTicket = () => {
    if (
      title.length > 0 &&
      body.length > 0 &&
      tagsInput.split(" ").length > 1
    ) {
      setButtonDisabled(false);
    }
  };

  const submitTicket = () => {
    const tagsArray = tagsInput.trim().split(" ");
    const ticket = {
      title,
      body,
      tags: tagsArray.length > 0 ? tagsArray : [],
      images,
      isPrivate,
    };
    const token = localStorage.getItem("user-token");

    try {
      console.log("Attempting to create ticket");

      setErrorInput(false);

      socket.emit("create-ticket", { token, ticket });
    } catch (error) {
      console.log("Error!", error);
    }
  };

  useEffect(() => {
    socket.on("error", ({ error }) => {
      console.log("Error!", error);
    });
    socket.on("new-ticket", ({ ticket }) => {
      console.log(ticket);
      navigate(`/tickets/${ticket._id}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  });

  return (
    <Container maxWidth="md">
      <CardWrap className={classes.cardWrapContainer}>
        <Grid container>
          <Grid item>
            <h4>please provide a brief, meaningful title to your ticket:</h4>
            <OutlinedInput
              placeholder="Add title"
              fullWidth
              onChange={(e) => {
                setTitle(e.target.value);
                validateTicket();
              }}
              value={title}
              sx={(theme) => ({
                color:
                  errorInput && body.length < 1
                    ? "red"
                    : theme.palette.primary.main,
              })}
            />

            {title.length > 0 && title.length < 101 ? (
              <></>
            ) : (
              <Alert severity="error">
                The Title be fewer than 100 characters and cannot be blank
              </Alert>
            )}

            <h4>Please describe your issue in as much detail as you can: </h4>
            <OutlinedInput
              placeholder="Add ticket body"
              fullWidth
              onChange={(e) => {
                setBody(e.target.value);
                validateTicket();
              }}
              value={body}
              multiline
              minRows={4}
              sx={(theme) => ({
                color:
                  errorInput && body.length < 1
                    ? "red"
                    : theme.palette.primary.main,
              })}
            />
            {body.length > 0 ? (
              <></>
            ) : (
              <Alert severity="error">The ticket text cannot be blank</Alert>
            )}

            <h4>
              Please add some tags to help categorise your issue (click on items
              in the cloud or write into the box below):
            </h4>

            <ChipArray
              tagsInput={tagsInput}
              chipData={chipData}
              handleTagClick={handleTagClick}
            />

            <OutlinedInput
              placeholder="Add tags separated by space"
              fullWidth
              onChange={(e) => setTagsInput(e.target.value)}
              value={tagsInput}
              sx={(theme) => ({
                color:
                  errorInput && body.length < 1
                    ? "red"
                    : theme.palette.primary.main,
              })}
            />
            {tagCount()}

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    value={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                    label="private"
                  />
                }
                label="Set as private"
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sx={(theme) => ({ marginBottom: theme.spacing(2) })}
          >
            {/* <img width="100" height="100" src={} /> */}
            <Button
              className={classes.button}
              variant="contained"
              component="label"
              accept=".png, .jpg, .jpeg"
              type="file"
              name="avatar"
              onChange={handleFileInputChange}
            >
              Choose File
              <input hidden type="file" />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {images.map((image, i) => (
              <img key={i} width="100px" height="auto" src={image} />
            ))}
          </Grid>
          {errorInput && (
            <Typography variant="body2" sx={{ color: "red" }}>
              Missing fields
            </Typography>
          )}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={submitTicket}
              disabled={buttonDisabled}
              variant="contained"
            >
              Create ticket
            </Button>
          </Grid>
        </Grid>
      </CardWrap>
    </Container>
  );
};

export default CreateTicket;
