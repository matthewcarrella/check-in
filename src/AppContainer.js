import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import EventMain from './components/EventMain';
import App2 from "./App2";
import OrganizerLogin from './OrganizerLogin';
import User from './User';
import MyNav from './components/Navbar';

const q =  query(collection(db, 'events'));

const AppContainer = () => {
	const [myEvents, setMyEvents] = useState([]);
	useEffect(() => {
      
        onSnapshot(q, (snapshot) => {

        	console.log("HAS SNAPSHOT!");
        	snapshot.docs.map(doc => { console.log("GOT A DOC"); console.log(doc.data());});
          
     
         

            setMyEvents(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

            console.log(myEvents);

        })
    }, []);
	return (
		<Router>
			<MyNav/>
			<Routes>
				<Route exact path="/" element={<User events={myEvents}/>} />
				<Route path="/about" element={<OrganizerLogin/>} />
				
			</Routes>
		</Router>
	);
}

export default AppContainer;
