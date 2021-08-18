import React,{useState} from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Modals from '../../screens/authentication/Modals';
import Login from '../../screens/authentication/Login'
import Register from '../../screens/authentication/Register'


const styles = () => ({
  login: {
    marginLeft: "10px",
  }
});

const Header = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const accessToken = sessionStorage.getItem("access-token");
  const loginHandler = () => {
    setOpenModal(true);
  };
  
  const bookShowHandler = () => {
    if(accessToken){
      console.log("header",props)
        props.history.push({pathname:`/bookshow/${props.match.params.id}`,state:props.location.state});
    }
    else{
      setOpenModal(true);
    }
    
  };

  const updateModalHandler=()=>{
    setOpenModal(false);
  }

    const logoutHandler =()=>{

  }
  const { classes } = props;

  return (
    <div>
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <div>
          {props.hideBookShow ?  null : (
            <Button
              variant="contained"
              color="primary"
              onClick={bookShowHandler}
            >
              Book Show
            </Button>
          ) }
          {
            accessToken?          
            <Button
            variant="contained"
            className={classes.login}
            onClick={logoutHandler}
          >
            Logout
          </Button>:
                    <Button
            variant="contained"
            className={classes.login}
            onClick={loginHandler}
          >
            Login
          </Button>
          }

          <Modals login={<Login handleModal={updateModalHandler}/>} register={<Register />} handleModal={updateModalHandler} modalState={openModal} />
        </div>
      </div>
    </div>
  );
};
 
export default withStyles(styles)(Header);