import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import ParticipantsArrived from './components/ParticipantsArrived';
import ParticipantsRegistered from './components/ParticipantsRegistered';
import ParticipantsCompleted from './components/ParticipantsCompleted';
const q =  query(collection(db, 'registrants'), orderBy("last"));

function App2() {
    const [registrants, setRegistrants] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pwordInput, setPwordInput] = useState('');

    const handleInput = (event) => {
        setPwordInput(event.target.value);
    }

    const SubmitPword = (event) => {
        event.preventDefault();
        if (pwordInput=="1234") {
            setLoggedIn(true);
        }

    }

    
   



     async function handleCheckIn(id) {

const docRef = doc(db,'registrants', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const isComplete = (current.tshirt==false && current.tickets==0);
            const dataUpdate = {present: true};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }

  async function handleReset() {
          var i = 0;
          const tktvalues = [0, 0, 15, 30];
          const tshirtvalues = [true, true, false, false];
          registrants.forEach(async (registrant) => {
        const randVal = Math.random() < 0.5;
        const docRef = doc(db,'registrants', registrant.id);
        const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
      const dataUpdate = {present: false, complete: false, tickets: (randVal) ? 15 : 0, tshirt: (randVal) ? true : false};

            // const dataUpdate = {present: false, complete: false, tickets: tktvalues[i], tshirt: tshirtvalues[i]};
            updateDoc(docRef, dataUpdate);
            i++;
        } else {
            alert('No such Id. Please check again');
}});}



    useEffect(() => {
      
        onSnapshot(q, (snapshot) => {
          
     
         
            // snapshot.docs.forEach((doc) => { console.log('id is'); console.log(doc.id); });
            
            setRegistrants(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

            // setPresent(registrants.filter(x => x.data.present==true));
            // setAwait(registrants.filter(x => x.data.present==false));
        })
    }, []);


    if (loggedIn) {

    return (
        <div>
         <button onClick={handleReset}>Reset</button>
         <div style={{backgroundColor: "pink"}}>
        
        <Row className="bg-primary text-center" style={{color: "white"}}><Col><h2>Check In Complete</h2></Col></Row>
      <ParticipantsCompleted participants={registrants}/>
      <Row className="bg-primary text-center" style={{color: "white"}}><Col><h2>Pending</h2></Col></Row>
      <ParticipantsArrived participants={registrants} />
</div>
          <Row className="bg-primary text-center" style={{color: "white"}}>
          <Col><h2>Yet to arrive</h2></Col></Row>
         
                   <ParticipantsRegistered participants={registrants} handleCheckIn={handleCheckIn} />


        </div>);

    } else {
       return (<div>
       <h3>please log in</h3>
       <form onSubmit={SubmitPword}>
      <label>
      <h3 style={{color:"white", float: "left", marginRight: "10px"}}>Password</h3>
      <input type="text" value={pwordInput} onChange={handleInput} />
     </label>
      
     <br/>
      <button type="submit">Submit</button>
                               </form>


       </div>)
    }

}



 export default App2;