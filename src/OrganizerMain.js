import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle } from "react-icons/fa";
import DateTimePicker from 'react-datetime-picker';
import EventMainContainer from './components/EventMainContainer';

const q =  query(collection(db, 'events'));
const eventsCollection = collection(db, 'events');

const OrganizerMain = () => {
	const [events, setEvents] = useState([]);
	const [selected, setSelected] = useState('');
	const [eventSelected, setEventSelected] = useState({});
	const [registrants, setRegistrants] = useState([]);
	const [show, setShow] = useState(false);

	const [newEventTitle, setEventTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const handleChange = (event) => {


	setSelected(event.target.value);
	
  

  };


   useEffect(() => {
    const fetchSubcollectionData = async () => {
      const parentDocRef = doc(db, 'events', selected); // Reference to parent document
      const subcollectionRef = collection(parentDocRef, 'registrants'); 
      console.log("fetching registrants");

  


      const unsub = onSnapshot(subcollectionRef, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setRegistrants(data);
      });

      return unsub; // Cleanup listener on unmount
    };
     if (selected!='') {
    fetchSubcollectionData();
	}
  }, [selected]);




   async function handleEventSelected(id) {

const docRef = doc(db,'events', id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
            const current = docSnap.data();
            setEventSelected(current);
        } else {
            alert('No such Id. Please check again');
        }

        console.log(eventSelected);



  }


 async function handleCheckIn (docId) {
 	console.log("checking in ID: " + docId);
  try {
    const subcollectionRef = doc(db, "events", selected, "registrants", docId);
    const newData = {complete: true};
    await updateDoc(subcollectionRef, newData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

async function handleCreateEvent() {

	const data = {title: newEventTitle};
try {
    const docRef = await addDoc(eventsCollection, data);
    console.log("Document written with ID: ", docRef.id);
    alert("Successfully added event!");
    handleClose();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};


  useEffect(() => {
  	if (selected!='') {
  	handleEventSelected(selected);
  }
  }, [selected]);


	useEffect(() => {
      
        onSnapshot(q, (snapshot) => {
          
     
         

            setEvents(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))


            // setPresent(registrants.filter(x => x.data.present==true));
            // setAwait(registrants.filter(x => x.data.present==false));
        })
    }, []);


	return <div>

	 <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
        Title: <input style={{margin: "10px"}} name="eventTitle" value={newEventTitle} onChange={e => setEventTitle(e.target.value)}/>
     <br/>   Date/Time: <input style={{margin: "10px", width: "50%"}} aria-label="Date and time" type="datetime-local" />
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

	<Container>
			<Row className="bg-primary text-center" style={{color: "white"}}>
					<Col xs={4}>
								 <select style={{marginTop:"50px"}} value={selected} onChange={handleChange}>
        <option value="">Select event</option>
        {events.map((option) => (
          <option key={option.id} value={option.id}>
            {option.data.title}
          </option>
        ))}
      </select>
      				</Col>
					<Col xs={4}>
						<h2>Organizer View</h2>
					</Col>
					<Col xs={4}>
		
          <Button onClick={handleShow}>
           <FaPlusCircle style={{margin: "10px"}} size={40}/>
           </Button>
           <h3 style={{color: "white"}}>NEW EVENT</h3>
            
 
					</Col>
			</Row>
			<Row className="bg-warning text-center">
			<Col>

				 
  
      <EventMainContainer event={eventSelected} registrants={registrants} handleCheckIn={handleCheckIn}/>
      </Col>
      </Row>
      </Container>

			</div>
}

export default OrganizerMain;