import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Tshirt = ({id, todo, handleGiveShirt}) => {
    const docId = id;
    const name = todo.first + " " + todo.last;
     const final = (todo.name=="") ? "ALL GOOD FOR NOW" : name;
    
    return (
      <div style={{color: "white", fontSize: "25px"}}>
            <Row>
                  
                <Col className="bg-secondary text-center">{todo.size}</Col>
                <Col className="bg-secondary text-center">{final}</Col>
             { (final!="ALL GOOD FOR NOW") ? 
                <Col className="bg-secondary text-center"><button onClick={() => handleGiveShirt(docId)}>T Given
                </button></Col> :  <Col className="bg-secondary"></Col>}             </Row>
 </div>



    )
};
export default Tshirt;