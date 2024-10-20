import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const EventMainContainer = ({event,registrants, handleCheckIn}) => {
	const data = event ? event : {title: "none"};
	const eventRegistrants = registrants ? registrants : [];
	console.log(eventRegistrants);
	console.log(eventRegistrants.length);


	return <div>
				<h2 style={{backgroundColor: "black", color: "white", marginTop: "7px"}}>{data.title}</h2>

				{eventRegistrants.map((person) => {
					return (<div>
							<Row>
								<Col>
								<h2>{person.name}</h2>
								</Col>
								<Col>
								{ (!person.complete) && 
								<button onClick={() => handleCheckIn(person.id)}>checkin</button>
							}
								{ (person.complete) && <h2 style={{color: "green"}}>complete</h2> }
							</Col>
							</Row>
							<hr/>
							</div>);
				})}
			</div>
}

export default EventMainContainer;