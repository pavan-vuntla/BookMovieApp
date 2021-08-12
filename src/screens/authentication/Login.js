import React,{useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";



const  Login =()=>{
  const [userName,setUserName]=useState('');
  const [password, setPassword] = useState("");
  const [reqUserName, setReqUserName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const loginHandler=()=>{
    console.log(userName,password)
    userName === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
  }

  const emailHandler = (e) => {
    setUserName(e.target.value)
    console.log(userName);
  };
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="my-input" required={true}>
            Username
          </InputLabel>
          <Input
            id="my-input"
            value={userName}
            required
            onChange={emailHandler}
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
        <br />
        <FormControl>
          <Button variant="contained" color="primary" onSubmit={loginHandler}>
            Login
          </Button>
        </FormControl>
        </div>
      
    );
}

export default Login;