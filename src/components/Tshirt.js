import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Tshirt = ({id, todo, handleGiveShirt}) => {
    const docId = id;

    
    return (
      <div style={{color: "red"}}>
            <Row>
                
                <Col className="bg-secondary text-center">{todo.size}</Col>
                <Col className="bg-secondary text-center">{todo.name}</Col>
                <Col className="bg-secondary"><button onClick={() => handleGiveShirt(docId)}>T Given</button></Col>
                </Row>
 </div>



    )
};
export default Tshirt;