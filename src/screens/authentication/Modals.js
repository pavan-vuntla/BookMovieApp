import React,{useState,useEffect} from 'react';
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
      const [value, setValue] = useState(0);
      const[openModal,setOpenModal]=useState(false);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
useEffect(() => {console.log(props.modalState);
  setOpenModal(props.modalState);
}, [props.modalState]);

      const closeModalHandler=()=>{
        setOpenModal(false);
        console.log(props)

      }

    return (
      <Modal
        key={`${Math.random()*10}`}
        isOpen={openModal}
        style={customStyles}
        onRequestClose={closeModalHandler}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </Modal>
    );
}

export default Modals;