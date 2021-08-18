import React,{useState} from "react";
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
  }
});



const  Login =(props)=>{
  const [userName,setUserName]=useState('');
  const [password, setPassword] = useState("");
  const [reqUserName, setReqUserName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const { classes } = props;
  const loginHandler=()=>{
    
    userName === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    const accessToken=window.btoa(`${userName}:${password}`);
    console.log(accessToken);
    //sessionStorage.setItem("access-token",accessToken);
    

        fetch("http://localhost:8085/api/v1/auth/login", {
           method: "POST",
           headers: {
              "Content-Type": "application/json;charset=UTF-8",
              accept: "application/json",
              Authorization: "Basic "+accessToken, 
              "Cache-Control": "no-cache",
              "access-control-expose-headers": "access-token"
           },
           }).then((response) => {
                console.log(response.headers);
                return response.json() 
                  })
      .then((data) => {
        if(!data.code){
          console.log(data.headers)
          sessionStorage.setItem("access-token","uuuu");
          props.handleModal();
          
        }
        console.log(sessionStorage.getItem("access-token"));
      });
  }
  

  const changeHandler = (e,input) => {
    if(input==="username"){
      setUserName(e.target.value);
    }
    if(input==="password"){
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
              changeHandler(e,"username");
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
              changeHandler(e,"password");
            }}
          />
          <FormHelperText className={reqPassword}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <Button variant="contained" color="primary" onClick={loginHandler}>
            Login
          </Button>
        </FormControl>
        </div>
      
    );
}

export default withStyles(styles)(Login);