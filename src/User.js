import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie'
const q =  query(collection(db, 'registrants'), orderBy("last"));

const User = () => {

	const [cookies, setCookie] = useCookies(['checkinuserid1', 'checkinfirst']);

	const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };



	

async function registerUser(event) {
	const data = {
  first: inputValue,
  last: 'Ross',
  size: 'large',
  tickets: 0,
  tshirt: true,
  present: false,
  completed: false
};

event.preventDefault(); // Prevent default form submission

   

const docRef = await addDoc(collection(db, 'registrants'), data);


console.log("registered user with id: " + docRef.id);
setCookie('checkinuserid1', docRef.id, { path: '/'});
setCookie('checkinfirst', inputValue, { path: '/'});
 
}

  


	return (

		<CookiesProvider>
			<Container>
			<Row className="bg-primary text-center" style={{color: "white"}}>
					<Col>
						<h2>User View</h2>
					</Col>
			</Row>
			<Row className="bg-success text-center">
					<Col>
					
      						<div>
        						{cookies.checkinuserid1 ? <h2>Welcome, {cookies.checkinfirst}!</h2> : 

        							 <form onSubmit={registerUser}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
        						</form>}
      						</div>
						
					</Col>
			</Row>
		</Container>
	</CookiesProvider>);
}

export default User;