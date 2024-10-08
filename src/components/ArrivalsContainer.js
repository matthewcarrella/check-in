import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrivalsRow from "./ArrivalsRow";
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
const q =  query(collection(db, 'registrants'), orderBy("last"));





const ArrivalsContainer = ({id, arriver}) => {
     const docId = id;
    const name = arriver.first + " " + arriver.last;
    const final = (arriver.name=="") ? "NOBODY HERE" : name;
    const currentArriver = arriver;



    

    if (final=="NOBODY HERE") {
        return (<Row style={{ borderStyle: "solid", borderColor: "black"}}>
                        <Col className="bg-success text-center">NOBODY HERE</Col>
                </Row>);
    } else {

            return (                <ArrivalsRow arriver={currentArriver} id={docId}
                                />
                );
};
}
export default ArrivalsContainer;