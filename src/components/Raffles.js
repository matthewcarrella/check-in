import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Raffles = ({id, todo, handleGiveTickets}) => {
    const docId = id;
     const final = (todo.name=="") ? "NO TICKETS WAITING" : todo.name;
    
    return (
      <div style={{color: "white", fontSize: "25px"}}>
            <Row>
                  
                <Col className="bg-secondary text-center">{todo.tickets}</Col>
                <Col className="bg-secondary text-center">{final}</Col>
             { (final!="NO TICKETS WAITING") ? 
                <Col className="bg-secondary"><button onClick={() => handleGiveTickets(docId)}>Tkts Dispensed
                </button></Col> :  <Col className="bg-secondary"></Col>}             </Row>
 </div>



    )
};
export default Raffles;