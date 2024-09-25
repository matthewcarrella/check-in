import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from './components/Todo';
import Tshirt from './components/Tshirt';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
 import { Container, Row, Col } from 'react-bootstrap';

const q = query(collection(db, 'participants'));
function App() {
    const [registrants, setRegistrants] = useState([]);

    async function handleCheckIn(id) {
console.log("CHECKING IN" + id);
const docRef = doc(db,'participants', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const nowComplete = !current.tshirt;
            const dataUpdate = {present: !current.present, complete: nowComplete};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }

  async function handleGiveShirt(id) {

const docRef = doc(db,'participants', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const dataUpdate = {complete: true};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }


    useEffect(() => {
        console.log("testing");
        onSnapshot(q, (snapshot) => {
            console.log("gotsnap");
     
         
            snapshot.docs.forEach((doc) => console.log(doc.data()));
            
            setRegistrants(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, []);

    return (
        <div>

                <h2>Checked in</h2>
              
  
              {   registrants.filter(item => item.data.complete==true).map(ready =>
                        <h3>{ready.data.name}</h3>)
                    }
     <h2>Need T-shirts</h2>
        {registrants.filter(x => ((x.data.present & !x.data.complete & x.data.tshirt)==true)).map(walker => <Tshirt key={walker.id} 
                 id={walker.id}
                 handleGiveShirt={handleGiveShirt} 
                 todo={walker.data}/>)}

    
<h2>Yet to arrive</h2>
 { registrants.filter(x => x.data.present==false).map(arrival =>  <Todo key={arrival.id}
                                                                        id={arrival.id}
                                                                        handleCheckIn={handleCheckIn}
                                                                        todo={arrival.data}/>)} 
  
                    


        </div>
    );
}
export default App;