import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie';
import RegisteredUser from './RegisteredUser';

const q =  query(collection(db, 'registrants'), orderBy("last"));

const User = () => {

	const [cookies, setCookie] = useCookies(['checkinuserid1', 'checkinfirst']);

	const [inputValue, setInputValue] = useState('');
	const [tshirt, setTshirt] = useState(false);
	const [noTickets, setNoTickets] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleChangeNoTickets = (event) => {
  	setNoTickets(event.target.value);
  }

  const handleCheckChange = (event) => {
  	setTshirt(!tshirt);
  }


	

async function registerUser(event) {
	const data = {
  first: inputValue,
  last: 'Ross',
  size: 'large',
  tickets: noTickets,
  tshirt: tshirt,
  present: false,
  complete: false
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
        						{cookies.checkinuserid1 ? <RegisteredUser userId={cookies.checkinuserid1}/>: 

        							 <form onSubmit={registerUser}>
       <label>
      <h3 style={{color:"white", float: "left", marginRight: "10px"}}>Name</h3>
      <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <br/>
      <label>
       <h3 style={{color:"white", float: "left", marginRight: "10px"}}>No Tickets</h3>
      <input type="text" value={noTickets} onChange={handleChangeNoTickets}/>
      </label>
      <br/>
      <label>
       <h3 style={{color:"white", float: "left", marginRight: "10px"}}>T-Shirt</h3>
      <input type="checkbox" checked={tshirt} onChange={handleCheckChange}/>
      </label>
      <br/>
      <button type="submit">Submit</button>
        						</form>}
      						</div>
						
					</Col>
			</Row>
		</Container>
	</CookiesProvider>);
}

export default User;