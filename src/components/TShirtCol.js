import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import TShirtCheckbox from "./TShirtCheckbox";
import TicketCheckbox from "./TicketCheckbox";


const TShirtCol = ({arriver}) => {
  const [needSbhirt, setShirt] = useState(arriver.tshirt);
  const [needTickets, setTickets] = useState(arriver.tickets>0);
  const noTickets = arriver.tickets;
  const tshirtdialog = (arriver.tshirt) ? "t size" + " " + arriver.size : "no t shirt";
  const ticketdialog = (noTickets>0) ? "no. tickets: " + " " + noTickets : "0 tickets";

 function toggleTickets() {
  if (arriver.tickets>0) {
  setTickets(!needTickets);
 }
}
  
  function toggleShirt() {
    if (arriver.tshirt) {
 
    setShirt(!needSbhirt);
     }
  }


  return <Row>
          <Col>
              <Row>
                <Col>{tshirtdialog}</Col>
                 <Col>
                <TShirtCheckbox participantNeedsShirt={needSbhirt} toggleTShirt={toggleShirt}/>
                </Col>
              </Row>
          </Col>
          <Col>
          <Row>
                <Col>{ticketdialog}</Col>
                <Col><TicketCheckbox needsTickets={needTickets} toggleTickets={toggleTickets}/></Col>
          </Row>
          </Col>
          </Row>
}

export default TShirtCol;