import React from 'react';
import Modal from 'react-modal'
import Login from './Login'
import Register from './Register'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";



function TabPanel(props) {
  const { children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      
    >
      {value === index && (
        
          <div className="container">{children}</div>
        
      )}
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
const Modals =(props)=>{
      const [value, setValue] = React.useState(0);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
      <Modal isOpen={props.modalState} style={customStyles}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <TabPanel value={value} index={0} >
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </Modal>
    );
}

export default Modals;