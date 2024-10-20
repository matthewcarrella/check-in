import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie'


const q =  query(collection(db, 'all_registrants'));


const CheckAttending = ({userId, eventId}) => {
	 const [isAttending, setIsAttending] = useState(false);
	 const [userEventDoc, setUserEventDoc] = useState({data: {complete: false}});
	 const [userData, setUserData] = useState(null);
     const uid = userId;
     const eid = eventId;


     async function fetchUserData() {
     	try {
     		const collectionRef = collection(db, "all_registrants");
     		const docRef = doc(collectionRef, uid);
     		const userDoc = await getDoc(docRef);
     		setUserData(userDoc.data());

     } catch (error) {
     	console.error("error getting document:", error);
     }

    }
   


   async function handleRegister() {
   	console.log("REGISTERING " + uid + " for " + eid);
 
    try {
      // 1. Reference the parent document
    	const subcollectionRef = collection(db, "events", eid, "registrants");
      const docRef = doc(subcollectionRef, uid);

    await setDoc(docRef, {name: userData.first, complete: false});
    console.log("succeeded with doc adding");
    setIsAttending(true);

  
    } catch (error) {
      console.error('Error adding document:', error);
    } 
  };

 async function checkDocumentExists() {
    try {

  	const subcollectionRef = collection(db, "events", eid, "registrants");

  	

      const docRef = doc(subcollectionRef, uid);

    const docSnap = await getDoc(docRef);
    const doesExist = docSnap.exists();
    if (doesExist==true) {
    	setIsAttending(true);
    	setUserEventDoc({data: docSnap.data()});
    } else {
    	setIsAttending(false);
    }
  } catch (error) {
    console.error("Error checking document existence:", error);

  }

 }



useEffect(() => {
	fetchUserData();
	checkDocumentExists();
}, [eventId])


console.log("user data: " + userEventDoc);
if (isAttending) {
    if (userEventDoc.data.complete) {
    	return <h2 style={{color: "red"}}>Your check in is complete</h2>
    } else {
	return <h2>You are registered to attend</h2>
   }
} else {
	return <div><br/><button onClick={handleRegister}>register</button></div>
}




}


export default CheckAttending;