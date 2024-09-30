import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CheckComplete = ({id,  completer, handleGiveShirt}) => {
    const docId = id;
    const name = completer.first + " " + completer.last;
    const final = (completer.name=="") ? "NOBODY HERE" : name;

    
    return (
      <div style={{color: "pink", fontSize: "25px"}}>
            <Row>
                <Col className="bg-success text-center">{final}</Col>
              
                </Row>
 </div>



    )
};
export default CheckComplete;