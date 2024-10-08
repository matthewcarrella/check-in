import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from '../firebase.js';
import { collection, doc, query, orderBy, onSnapshot, getDoc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaPencilAlt } from "react-icons/fa";

const q =  query(collection(db, 'registrants'), orderBy("last"));





const CompletedContainer = ({id, completer}) => {
     const docId = id;
    const name = completer.first + " " + completer. last;
    const final = (name=="") ? "NOBODY HERE" : name;
   
    

    if (final=="NOBODY HERE") {
        return (<Row className="bg-primary" style={{ borderStyle: "solid", borderColor: "black", color: "white"}}>
                        <Col className="bg-success text-center">NOBODY HERE</Col>
                </Row>);
    } else {

            return <Row className="bg-warning text-center" style={{ borderStyle: "solid", borderColor: "black", color: "blue"}}>
            <Col><h2>{name}</h2></Col>
            </Row>
};
}
export default CompletedContainer;