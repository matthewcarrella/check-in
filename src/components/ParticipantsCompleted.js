import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompletedContainer from './CompletedContainer';

const ParticipantsCompleted = ({participants}) => {
   	const [completed, setCompleted] = useState([]);
   	const currentParticipants = participants;




     useEffect(() => {
     		 setCompleted(currentParticipants.filter(x => x.data.complete==true));

     		}, [participants]);


     if (completed.length===0) {
        return <Row className="bg-warning text-center" style={{color: "blue"}}>
        <Col><h3>No complete check ins</h3></Col></Row>
     }    return <div> {
                    completed.map(completer => <CompletedContainer key={completer.id}
                                                                        id={completer.id}
                                                                     
                                                                        completer={completer.data}/>)
                }
            </div>;
    	
 
}


export default ParticipantsCompleted;