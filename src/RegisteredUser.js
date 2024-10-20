import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { CookiesProvider, useCookies } from 'react-cookie'
import UserCompleted from './UserCompleted';
import CheckAttending from './components/CheckAttending';

const q =  query(collection(db, 'all_registrants'), orderBy("last"));

const RegisteredUser = ({userId, currentEvents}) => {

  const events = currentEvents;

  const [data, setData] = useState(null)
  const id = userId;

  const [selected, setSelected] = useState('');
  const [eventSelected, setEventSelected] = useState({});



  const handleChange = (event) => {


  setSelected(event.target.value);
  
  

  };
  async function fetchData() {
    const docRef = doc(db, 'all_registrants', id);
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

    { data &&  (


     <div>

        <h3 style={{color: "white"}}>{data.first}</h3>
    
  
      
    </div>

        )}

   <select value={selected} onChange={handleChange}>
        <option value="">Select an option</option>
        {currentEvents.map((option) => (
          <option key={option.id} value={option.id}>
            {option.data.title}
          </option>
        ))}
      </select>


      { (selected!='') && (<CheckAttending userId={id} eventId={selected}/>)}


     

      </div>
		);
}

export default RegisteredUser;