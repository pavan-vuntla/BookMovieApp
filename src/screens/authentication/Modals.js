import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Modals.css";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <div className="container">{children}</div>}
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const Modals = (props) => {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setOpenModal(props.modalState);
  }, [props.modalState]);

  const closeModalHandler = () => {
    props.handleModal();
  };

  return (
    <Modal
      key={`${Math.random() * 10}`}
      isOpen={openModal}
      style={customStyles}
      onRequestClose={closeModalHandler}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {props.login}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.register}
      </TabPanel>
    </Modal>
  );
};

export default Modals;
