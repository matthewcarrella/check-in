import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CheckComplete = ({id,  completer, handleGiveShirt}) => {
    const docId = id;
    const final = (completer.name=="") ? "NOBODY HERE" : completer.name;

    
    return (
      <div style={{color: "pink"}}>
            <Row>
                <Col className="bg-success text-center">{final}</Col>
              
                </Row>
 </div>



    )
};
export default CheckComplete;