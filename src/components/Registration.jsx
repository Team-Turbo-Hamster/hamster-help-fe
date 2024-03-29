import {
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
  Avatar,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "../styles/components/registerForm.styles";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { registerUser } from "../utils/authRequests";
import { useNavigate } from "react-router-dom";

const NewUserForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    avatar: "",
    passwordVerify: "",
    email: "",
    isATutor: false,
    showPassword: false,
  });
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const tests = {
    username: /^[a-zA-Z\s-]{4,15}$/,
    password: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])^[a-zA-Z0-9!@#$%^&*]{6,30}$/,
    email: /[+*?^$./\w]+@\w+\.\w+/,
    name: /^[a-zA-Z\s-]{1,30}$/,
  };
  const [testsPassed, setTestsPassed] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleBlur = (prop) => () => {
    let test = new RegExp(tests[prop]);
    test.test(values[prop])
      ? setTestsPassed({ ...testsPassed, [prop]: true })
      : setTestsPassed({ ...testsPassed, [prop]: false });
    handlePasswordVerify();
    handleFormComplete();
  };

  const setTutor = (event) => {
    setValues({ ...values, isATutor: event.target.checked });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordVerify = () => {
    values.password === values.passwordVerify
      ? (testsPassed.passwordVerify = true)
      : (testsPassed.passwordVerify = false);
    handleFormComplete();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const closeSnack = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleHelperText = (prop, helperText) => {
    return testsPassed.hasOwnProperty(prop) ? (
      testsPassed[prop] === true ? (
        <></>
      ) : (
        <Alert severity="error">{helperText}</Alert>
      )
    ) : (
      <></>
    );
  };

  const handleFormComplete = () => {
    document.getElementById("RegisterButton").disabled = false;
    testsPassed.name === true &&
    testsPassed.username === true &&
    testsPassed.password === true &&
    testsPassed.passwordVerify === true &&
    testsPassed.email === true
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
    // console.log(testsPassed)
    // console.log(values)
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setValues((prevState) => ({
        ...prevState,
        avatar: reader.result,
      }));
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const handleSubmit = (event) => {
    const userForm = {
      email: values.email,
      avatar: values.avatar,
      name: values.name,
      role: values.isATutor ? "Tutor" : "Student",
      password: values.password,
      username: values.username,
    };

    registerUser(userForm)
      .then((data) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <Box className={classes.avatarContainer}>
        <Avatar className={classes.avatar} src={values.avatar} />

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
          <input type="file" hidden />
        </Button>
      </Box>
      <br />
      {/* Username field */}
      {/* _______________________________________________________ */}
      <FormControl sx={{ m: 1, width: "30ch", marginTop: "5px" }}>
        <InputLabel>Username</InputLabel>
        <OutlinedInput
          id="usernameField"
          label="Username"
          helpertext="Please enter your username"
          onBlur={handleBlur("username")}
          onChange={handleChange("username")}
        />
        {handleHelperText(
          "username",
          "username must be 1-30 characters long and contain only letters or spaces"
        )}
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="nameField"
          label="Name"
          helpertext="Please enter your name"
          onBlur={handleBlur("name")}
          onChange={handleChange("name")}
        />
        {handleHelperText("name", "name must be 4-15 characters long")}
      </FormControl>
      <br />
      {/* Email field*/}
      {/* _______________________________________________________ */}
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel>Email address</InputLabel>
        <OutlinedInput
          id="emailField"
          label="Email address"
          helpertext="Please enter your email address"
          onBlur={handleBlur("email")}
          onChange={handleChange("email")}
        />
        {handleHelperText(
          "email",
          'Email must be a valid email address; "example@domain.tag"'
        )}
      </FormControl>
      <br />
      {/* Password field */}
      {/* _______________________________________________________ */}
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          id="passwordField"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          label="password"
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {handleHelperText(
          "password",
          "Password must be 6-30 characters long, must contain only letters, numbers and special characters(!@#$%^&*) and must contain at least one uppercase letter, one lowercase letter and one number"
        )}
      </FormControl>
      <br />
      {/* Password verification field */}
      {/* _______________________________________________________ */}
      <FormControl sx={{ m: 1, width: "30ch" }}>
        <InputLabel>Re-enter Password</InputLabel>
        <OutlinedInput
          id="passwordVerifyField"
          type={values.showPassword ? "text" : "password"}
          value={values.passwordVerify}
          label="Re-enter Password"
          onChange={handleChange("passwordVerify")}
          onBlur={handlePasswordVerify}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {handleHelperText("passwordVerify", "Password fields must match!")}
      </FormControl>
      <br />
      {/* Tutor toggle */}
      {/* _______________________________________________________ */}
      <FormControlLabel
        control={<Switch onChange={setTutor} />}
        label="I am a tutor"
      />
      <br />

      <Button
        id="RegisterButton"
        variant={buttonDisabled ? "outlined" : "contained"}
        type="Submit"
        disabled={buttonDisabled}
      >
        Register
      </Button>
    </form>
  );
};

export default NewUserForm;
