import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OrganizerMain from './OrganizerMain';


function OrganizerLogin() {

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



    if (loggedIn) {

    return (
        <div>
        <OrganizerMain/>


        </div>);

    } else {
       return (<div>
       <Row className="bg-primary text-center" style={{color: "white"}}>
                    <Col xs={4}>
                           <h2>Organizer View</h2>     
                    </Col>
                    <Col xs={4}>
                         <h3>please log in with password</h3>
                    </Col>
                    <Col xs={4}>
                        <form onSubmit={SubmitPword}>
      <label>
    
      <input style={{margin: "10px"}} type="text" value={pwordInput} onChange={handleInput} />
     </label>
      
     <br/>
      <button type="submit">Submit</button>
                               </form>
                    </Col>
        
      
            </Row>
      
       


       </div>)
    }

}



 export default OrganizerLogin;