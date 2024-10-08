import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPencilAlt } from "react-icons/fa";




const InnerBox = ({nobodyHere, id, submitCallback,note}) => {
    const docId = id;
  const bodyHere = nobodyHere;
  const entryNote = note ? note : "n/a";
    console.log("WHWWAT");
    console.log(bodyHere);

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




    
    
const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(id);
    submitCallback(docId, inputValue);
    console.log('Submitted value:', inputValue);
    handleClose();
  };
  if (bodyHere=="NOBODY HERE") {
  return <Col className="bg-success" style={{padding: "0"}} />; } else { return <Col className="bg-success" style={{padding: "0"}}>
              
                

               
                    <Button variant="primary" onClick={handleShow}>
      <FaPencilAlt/> <h3>{entryNote}</h3>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
  
        </Modal.Footer>
      </Modal>


                </Col>;}
};
export default InnerBox;