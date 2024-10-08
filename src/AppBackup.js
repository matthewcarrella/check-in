
import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Tshirt from './components/Tshirt';
import CheckComplete from './components/CheckComplete';
import Raffles from './components/Raffles';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
 import { Container, Row, Col } from 'react-bootstrap';
const q =  query(collection(db, 'registrants'), orderBy("last"));
function App() {
    const [registrants, setRegistrants] = useState([]);
     const [show, setShow] = useState(false);
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    async function handleCheckIn(id) {
console.log("CHECKING IN" + id);
const docRef = doc(db,'registrants', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const isComplete = (current.tshirt==false && current.tickets==0);
            const dataUpdate = {present: true, complete: isComplete};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }

  async function handleGiveShirt(id) {

const docRef = doc(db,'registrants', id);

const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const isComplete = current.tickets==0;
            const dataUpdate = {complete: isComplete, tshirt: false};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }

  async function submitCallback(docId, inputValue) {
    console.log("we got one");
    console.log(inputValue);
    console.log(docId);
     const docRef = doc(db, 'registrants', docId);
    const docSnap = await getDoc(docRef);
    if  (docSnap.exists()) {
        const current = docSnap.data()
        const dataUpdate = {note: inputValue};
        updateDoc(docRef, dataUpdate);

    } else {
        alert("no such id. please check  again");
    }
  }



    async function handleGiveTickets(id) {

const docRef = doc(db,'registrants', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            const dataUpdate = {complete: true, tickets: 0};
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  }





    useEffect(() => {
      
        onSnapshot(q, (snapshot) => {
          
     
         
            // snapshot.docs.forEach((doc) => { console.log('id is'); console.log(doc.id); });
            
            setRegistrants(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, []);


    function checkHasTickets() {
       const filterNeedTickets = registrants.filter(x => x.data.present & !x.data.tshirt & !x.data.complete & x.data.tickets != 0);
       // console.log('ticketholders length: ' + filterNeedTickets.length);
       if (filterNeedTickets.length > 0) {
        return filterNeedTickets; } else { return [{data: {name: ""}}]}
       }
    

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
          var i = 0;
          const tktvalues = [0, 0, 15, 30];
          const tshirtvalues = [true, true, false, false];
          registrants.forEach(async (registrant) => {

        const docRef = doc(db,'registrants', registrant.id);
        const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
      const dataUpdate = {present: false, complete: false, tickets: 0};

            // const dataUpdate = {present: false, complete: false, tickets: tktvalues[i], tshirt: tshirtvalues[i]};
            updateDoc(docRef, dataUpdate);
            i++;
        } else {
            alert('No such Id. Please check again');
}});}
    return (
        <div>

          <button onClick={handleReset}>Reset</button>

            <h2 style={{textAlign: "center"}}>Checked in</h2>
                  { checkCompleted().map(ready =>
                       
                        <CheckComplete key={ready.id}
                        id={ready.id}
                        completer={ready.data} show={show}
                         handleShow={handleShow}
                          handleClose={handleClose}
                          submitCallback={submitCallback}
            
                         
                 />)}

                  <br/><br/><br/>

          <h2 style={{textAlign: "center"}}>Has Raffle Tickets</h2>
           <Row style={{textAlign: "center"}}>
        <Col># of tickets</Col>
        <Col>Name</Col>
        <Col>Confirm</Col>
    </Row>
          {checkHasTickets().map(walker =>  <Raffles key={walker.id} 
                 id={walker.id}
                 handleGiveTickets={handleGiveTickets} 
                 todo={walker.data}/>)}

              
                
          

                  
                    
     <h2 style={{textAlign: "center"}} >Need T-shirts</h2>
     <Row style={{textAlign: "center"}}>
        <Col>Size</Col>
        <Col>Name</Col>
        <Col>Confirm</Col>
    </Row>
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