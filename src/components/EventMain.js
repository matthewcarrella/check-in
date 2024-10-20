import React from 'react';


const EventMain = ({event,registrants, handleCheckIn}) => {
	const data = event ? event : {title: "none"};
	const eventRegistrants = registrants ? registrants : [];
	console.log(eventRegistrants);
	console.log(eventRegistrants.length);
	return <div>
				<h2>{data.title}</h2>

				{eventRegistrants.map((person) => {
					return (<div>

								<h2>{person.name}</h2>
								<button onClick={() => handleCheckIn(person.id)}>checkin</button>
							
							</div>);
				})}
			</div>
}

export default EventMain;