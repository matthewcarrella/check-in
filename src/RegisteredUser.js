import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie'
const q =  query(collection(db, 'registrants'), orderBy("last"));

const RegisteredUser = ({userId}) => {

  const [data, setData] = useState(null)
  const id = userId;
  async function fetchData() {
    const docRef = doc(db, 'registrants', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("no such document!");
    }

  }

 
  useEffect(() => {
   

    fetchData();
  }, []);



	return (
    <div>
     { data && (

     <div>
        <h3 style={{color: "white"}}>{data.first}</h3>
        <h3 style={{color: "white"}}>{data.tickets} tickets</h3>
       { (data.tshirt) ? <h3 style={{color: "white"}}>size: {data.size}</h3> : <h3 style={{color: "white"}}>no shirt</h3> }
    </div>

        )}

      </div>
		);
}

export default RegisteredUser;