import React,{useState} from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Modals from '../../screens/authentication/Modals';
//import { withRouter } from "react-router";
//import Box from "@material-ui/core";


const styles = () => ({
  login: {
    marginLeft: "10px",
  }
});

const Header = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const loginHandler = () => {
    setOpenModal(true);
  };
  
  const bookShowHandler = () => {
    console.log(props);
    props.history.push("/bookshow/1234");
  };
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
          <Button
            variant="contained"
            className={classes.login}
            onClick={loginHandler}
          >
            Login
          </Button>
          <Modals modalState={openModal} />
        </div>
      </div>
    </div>
  );
};
 
export default withStyles(styles)(Header);