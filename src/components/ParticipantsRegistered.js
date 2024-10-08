import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Todo from './Todo.js';

const ParticipantsRegistered = ({participants, handleCheckIn}) => {
   	const [awaiting, setAwaiting] = useState([]);
   	const currentParticipants = participants;




     useEffect(() => {
     		 setAwaiting(currentParticipants.filter(x => x.data.present==false));
     		 console.log(awaiting.length);
     		}, [participants]);


    if (awaiting.length>0) {
    	return <div>
    			
    			{
    				awaiting.map(awaiter => <Todo key={awaiter.id}
                                                                        id={awaiter.id}
                                                                        handleCheckIn={handleCheckIn}
                                                                        todo={awaiter.data}/>)
    			}
    			</div>;
    } else {
    	return 
    	<h2>everyone is here</h2>;
    }
}


export default ParticipantsRegistered;