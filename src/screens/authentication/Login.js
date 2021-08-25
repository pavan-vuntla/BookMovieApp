import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const styles = () => ({
  alignItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reqUserName, setReqUserName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const { classes } = props;
  const loginHandler = () => {
    userName === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    const accessToken = window.btoa(`${userName}:${password}`);
    if (userName === "" || password === "") {
      return;
    }

    axios({
      method: "post",
      url: `${props.baseUrl}auth/login`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
        Authorization: "Basic " + accessToken,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "access-control-expose-headers": "access-token",
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "access-token",
          response.headers["access-token"]
        );

        props.handleModal();
        props.buttonNameChange();
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message || "Something went wrong");
      });
  };
  const changeHandler = (e, input) => {
    if (input === "username") {
      setUserName(e.target.value);
    }
    if (input === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div className={classes.alignItem}>
      <FormControl>
        <InputLabel htmlFor="my-input" required={true}>
          Username
        </InputLabel>
        <Input
          id="my-input"
          value={userName}
          required
          onChange={(e) => {
            changeHandler(e, "username");
          }}
        />
        <FormHelperText className={reqUserName}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="my-password" required={true}>
          Password
        </InputLabel>
        <Input
          type="password"
          id="my-password"
          value={password}
          required
          onChange={(e) => {
            changeHandler(e, "password");
          }}
        />
        <FormHelperText className={reqPassword}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <div className="red">{errorMessage}</div>
      <br />
      <FormControl>
        <Button variant="contained" color="primary" onClick={loginHandler}>
          Login
        </Button>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(Login);
