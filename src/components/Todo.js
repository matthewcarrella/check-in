import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Todo = ({id, todo, handleCheckIn}) => {
    const docId = id;

    
    return (
      
            <Row style={{color: "blue"}}>
                <Col className="bg-secondary">{todo.name}</Col>
                <Col className="bg-secondary"><button onClick={() => handleCheckIn(docId)}>click me </button></Col>

            </Row>
 



    )
};
export default Todo;