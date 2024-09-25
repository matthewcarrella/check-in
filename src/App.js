import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from './components/Todo';
import Tshirt from './components/Tshirt';
import CheckComplete from './components/CheckComplete';
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

  function checkYetToArrive() {
     return registrants.filter(x => x.data.present==false);
  }

 function checkCompleted() {
        const filterCompleted = registrants.filter(item => item.data.complete==true);
        console.log(filterCompleted);
        if (filterCompleted.length>0) {
        return filterCompleted; } else { return [{data: {name: ""}}];}}


        function checkTshirtWait() {

                const filterNeedsTshirts = registrants.filter(x => ((x.data.present & !x.data.complete & x.data.tshirt)==true));
                if (filterNeedsTshirts.length>0) {
                    console.log("need tshirts");
                    return filterNeedsTshirts; } 

                    else { return [{data: {name: ""}}]; }}


          async function handleReset() {

          registrants.forEach(async (registrant) => {

        const docRef = doc(db,'participants', registrant.id);
        const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
     
            const dataUpdate = {present: false, complete: false};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
}});}
    return (
        <div>

          <button onClick={handleReset}>Reset</button>

                <h2 style={{textAlign: "center"}}>Checked in</h2>
                  { checkCompleted().map(ready =>
                       
                        <CheckComplete key={ready.id}
                        completer={ready.data}/>)}

                
          

                  
                    
     <h2 style={{textAlign: "center"}} >Need T-shirts</h2>
      { checkTshirtWait().map(walker =>
                       <Tshirt key={walker.id} 
                 id={walker.id}
                 handleGiveShirt={handleGiveShirt} 
                 todo={walker.data}/>)}

      <h2 style={{textAlign: "center"}}>Yet to arrive</h2>
                  { checkYetToArrive().map(arrival =>  <Todo key={arrival.id}
                                                                        id={arrival.id}
                                                                        handleCheckIn={handleCheckIn}
                                                                        todo={arrival.data}/>)}

                  

       
    


                    


        </div>
    );
}
export default App;