import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Completed = ({id, walker, handleGiveShirt}) => {
    const docId = id;

    
    return (
      <div style={{color: "pink", fontSize: "25px"}}>
            <Row>
                <Col className="bg-success text-center">{walker.name}</Col>
              
                </Row>
 </div>



    )
};
export default Completed;