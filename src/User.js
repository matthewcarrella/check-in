import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
const q =  query(collection(db, 'registrants'), orderBy("last"));

const User = ({}) => {

	return <Row className="bg-primary text-center" style={{color: "white"}}>
					<Col>
						<h2>User View</h2>
					</Col>
			</Row>
}

export default User;