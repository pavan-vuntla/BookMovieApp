import React,{useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [reqfirstName, setReqfirstName] = useState("dispNone");
  const [reqLastName, setReqLastName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const [reqEmail, setReqEmail] = useState("dispNone");
  const [reqContact, setReqContact] = useState("dispNone");
  const registerHandler = () => {
    firstName === ""? setReqfirstName("dispBlock"): setReqfirstName("dispNone");
    lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    contact === "" ? setReqContact("dispBlock") : setReqContact("dispNone");
  };
  return (
    <form>
      <FormControl>
        <InputLabel htmlFor="my-input" required={true}>
          First Name
        </InputLabel>
        <Input
          id="my-input"
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
        <InputLabel htmlFor="my-input" required={true}>
          Last Name
        </InputLabel>
        <Input
          id="my-input"
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
        <InputLabel htmlFor="my-input" required={true}>
          Email
        </InputLabel>
        <Input
          id="my-input"
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
      <br />
      <FormControl>
        <Button variant="contained" color="primary" onClick={registerHandler}>
          Register
        </Button>
      </FormControl>
    </form>
  );
};

export default Register;
