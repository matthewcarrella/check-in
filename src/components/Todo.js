import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Todo = ({id, todo, handleCheckIn}) => {
    const docId = id;
    const name = todo.first + " " + todo.last;

    
    return (
      
            <Row style={{color: "blue", borderStyle: "solid", borderColor: "black"}}>
                <Col xs={1} className="bg-warning"/>
                <Col xs={6} className="bg-warning text-center" style={{padding: "10px"}}><h3>{name}</h3></Col>

                <Col className="bg-warning"><button onClick={() => handleCheckIn(docId)}>Check In</button></Col>

            </Row>
 



    )
};
export default Todo;