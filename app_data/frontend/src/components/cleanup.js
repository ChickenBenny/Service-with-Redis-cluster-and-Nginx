import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const Cleanup = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const flush = () =>{
        const headers = { 'Content-Type': 'application/json' };
        fetch('http://localhost:8004/cleanup', {
                method: 'GET', 
                headers: headers,
                });
        setShow(false);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Clean up the database
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>Try to Flush the database?</Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Back
                    </Button>
                    <Button variant="danger" onClick={flush}>
                        Clean up
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
}