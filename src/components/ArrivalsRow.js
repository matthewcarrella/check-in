import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import TShirtCheckbox from "./TShirtCheckbox";
import TicketCheckbox from "./TicketCheckbox";
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
const q =  query(collection(db, 'registrants'), orderBy("last"));


const ArrivalsRow = ({arriver, id}) => {
  const docId = id;
  const [needShirt, setShirt] = useState(arriver.tshirt);
  const [needTickets, setTickets] = useState(arriver.tickets>0);
  const noTickets = arriver.tickets;
  const tshirtdialog = (arriver.tshirt) ? "t size" + " " + arriver.size : "no t shirt";
  const ticketdialog = (noTickets>0) ? "no. tickets: " + " " + noTickets : "0 tickets";
  const namedialog = (arriver.first) + " " + arriver.last;



      async function handleComplete() {
        if (!needShirt) { console.log("no tshirt needed (T IS FALSE)");} else { console.log('tee needed (T IS TRUE)')}

    if (!needTickets) { console.log("no tickets needed");}
    if (!needShirt && !needTickets) {
const docRef = doc(db,'registrants', docId);

const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
           
            const dataUpdate = {complete: true}
            updateDoc(docRef, dataUpdate);
        } else {
            alert('No such Id. Please check again');
        }



  } else {
    alert('please check to confirm before proceeding');
  }
}

 function toggleTickets() {
  if (arriver.tickets>0) {
  setTickets(!needTickets);
 }
}
  
  function toggleShirt() {
    console.log("toggle tee initiated");

    if (arriver.tshirt==true) {

          setShirt(!needShirt);

    } else { setShirt(false); }
  


}


  return <Container style={{borderStyle: "solid", borderColor: "black"}}>
  <Row>
      <Col>{namedialog}</Col>
      <Col>
        <Row>
<Col>{tshirtdialog}</Col>
          <Col><TShirtCheckbox needTee={needShirt} toggleTShirt={toggleShirt}/></Col>
          
        
        </Row>
        <Row>
        <Col>{ticketdialog}</Col>
              <Col><TicketCheckbox needsTickets={needTickets} toggleTickets={toggleTickets}/></Col>
            
            
        </Row>
        </Col>
      <Col><button onClick={handleComplete}>complete</button></Col>
  </Row>
          </Container>
}

export default ArrivalsRow;