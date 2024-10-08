import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrivalsContainer from './ArrivalsContainer';

const ParticipantsArrived = ({participants, handleCheckIn}) => {
   	const [arrived, setArrived] = useState([]);
   	const currentParticipants = participants;




     useEffect(() => {
     		 setArrived(currentParticipants.filter(x => x.data.present==true && x.data.complete==false));
       
     		}, [participants]);


     if (arrived.length===0) {
        return <Row className="bg-warning text-center" style={{color: "blue"}}><Col>
        <h3>Nothing pending</h3></Col></Row>;
     }    return <div> {
                    arrived.map(arriver => <ArrivalsContainer key={arriver.id}
                                                                        id={arriver.id}
                                                                     
                                                                        arriver={arriver.data}/>)
                }
            </div>;
    	
 
}


export default ParticipantsArrived;