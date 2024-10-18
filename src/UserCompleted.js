import React from 'react';


const UserCompleted = ({isComplete, isPresent}) => {
	const completed = isComplete;
    const present = isPresent;
	if (present) {
		if (completed) {
		return <h2 style={{color: "red"}}>complete</h2>
	} else {
		return <h2 style={{color: "yellow"}}>pending</h2>
	}

	} else {
		return <p></p>
	}

	
}

export default UserCompleted;