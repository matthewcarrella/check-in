import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InnerBox from "./InnerBox";
import ShirtBox from "./ShirtBox";



const CheckComplete = ({id,  completer, handleGiveShirt, show, handleShow, handleClose, submitCallback}) => {
    const docId = id;
    const name = completer.first + " " + completer.last;
    const final = (completer.name=="") ? "NOBODY HERE" : name;





 
    return (
   
        <Row style={{ borderStyle: "solid", borderColor: "black"}}>
        <Col>
        <Row>
                <Col className="bg-success text-center" style={{padding: "10px", color: "pink"}}>{final}</Col>
                </Row>
       <Row style={{color: "blue", fontSize: "19px"}}>
                <Col className="bg-success text-center">
                             <ShirtBox key={id} needsShirt={completer.tshirt} size={completer.size}/>
                </Col>
                <Col className="bg-success text-center"> 
                <InnerBox key={id} nobodyHere={final} id={id} submitCallback={submitCallback} note={completer.note}/>
                </Col>
    
        </Row>
                
              

      </Col>
      </Row>



    )
};

export default CheckComplete;
  

