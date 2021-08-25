import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Modals from "../../screens/authentication/Modals";
import Login from "../../screens/authentication/Login";
import Register from "../../screens/authentication/Register";

const styles = () => ({
  login: {
    marginLeft: "10px",
  },
});

const Header = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("access-token");
    if (sessionToken) {
      setAccessToken(true);
    }
  }, []);
  const loginHandler = () => {
    setOpenModal(true);
  };

  const bookShowHandler = () => {
    if (accessToken) {
      props.history.push({
        pathname: `/bookshow/${props.match.params.id}`,
        state: props.location.state,
      });
    } else {
      setOpenModal(true);
    }
  };
  const updateModalHandler = () => {
    setOpenModal(false);
  };

  const toggleButtonHandler = () => {
    setAccessToken(true);
  };
  const logoutHandler = () => {
    fetch(`${props.baseUrl}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access-token"),
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        sessionStorage.removeItem("access-token");
        setAccessToken(false);
      })
      .catch(function (error) {});
  };

  const { classes } = props;

  return (
    <div>
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <div>
          {props.hideBookShow ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={bookShowHandler}
            >
              Book Show
            </Button>
          )}
          {accessToken ? (
            <Button
              variant="contained"
              className={classes.login}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.login}
              onClick={loginHandler}
            >
              Login
            </Button>
          )}

          <Modals
            login={
              <Login
                handleModal={updateModalHandler}
                baseUrl={props.baseUrl}
                buttonNameChange={toggleButtonHandler}
              />
            }
            register={<Register baseUrl={props.baseUrl} />}
            handleModal={updateModalHandler}
            modalState={openModal}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
