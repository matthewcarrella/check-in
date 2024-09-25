import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Todo = ({id, todo, handleCheckIn}) => {
    const docId = id;

    
    return (
      
            <Row style={{color: "blue"}}>
                <Col className="bg-warning"/>
                <Col className="bg-warning text-center">{todo.name}</Col>

                <Col className="bg-warning"><button onClick={() => handleCheckIn(docId)}>Check In</button></Col>

            </Row>
 



    )
};
export default Todo;