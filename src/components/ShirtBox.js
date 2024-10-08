import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCheck } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";




const ShirtBox = ({needsShirt, size}) => {
    const needShirt = needsShirt;
  const participantSize = size;


  if (!needShirt) {
  return <Col className="bg-success">
          <h3>Shirt</h3>
                <MdDoNotDisturbAlt/>

</Col>; } else { return <Col className="bg-success">
              
                

               <h3>{participantSize}</h3>

                </Col>;}
};
export default ShirtBox;