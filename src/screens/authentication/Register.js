import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  alignItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

const Register = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [reqfirstName, setReqfirstName] = useState("dispNone");
  const [reqLastName, setReqLastName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const [reqEmail, setReqEmail] = useState("dispNone");
  const [reqContact, setReqContact] = useState("dispNone");

  const { classes } = props;
  const registerHandler = (e) => {
    firstName === ""
      ? setReqfirstName("dispBlock")
      : setReqfirstName("dispNone");
    lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    contact === "" ? setReqContact("dispBlock") : setReqContact("dispNone");

    if (
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      email === "" ||
      contact === ""
    ) {
      return;
    }
    const body = JSON.stringify({
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      mobile_number: contact,
      password: password,
    });

    fetch(`${props.baseUrl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "USR-009") {
          setRegistrationMessage(data.message);
        } else {
          setRegistrationMessage("Registration Successful. Please Login!");
        }
      });
  };
  return (
    <form className={classes.alignItem}>
      <FormControl>
        <InputLabel htmlFor="my-firstName" required={true}>
          First Name
        </InputLabel>
        <Input
          id="my-firstName"
          value={firstName}
          required
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />
        <FormHelperText className={reqfirstName}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="my-lastName" required={true}>
          Last Name
        </InputLabel>
        <Input
          id="my-lastName"
          value={lastName}
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <FormHelperText className={reqLastName}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="my-email" required={true}>
          Email
        </InputLabel>
        <Input
          id="my-email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormHelperText className={reqEmail}>
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
            setPassword(e.target.value);
          }}
        />
        <FormHelperText className={reqPassword}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="my-contact" required={true}>
          Contact No
        </InputLabel>
        <Input
          id="my-contact"
          value={contact}
          required
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <FormHelperText className={reqContact}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <div>{registrationMessage}</div>
      <br />

      <FormControl>
        <Button variant="contained" color="primary" onClick={registerHandler}>
          Register
        </Button>
      </FormControl>
    </form>
  );
};

export default withStyles(styles)(Register);
