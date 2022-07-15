import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Upload = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [file, setFile] = useState(null);
    const update = () => {
        const headers = { 'Content-Type': 'application/json' };
        fetch('http://localhost:8000/uploadfile', {
            method: 'POST',
            // headers: headers,
            body: file
        });
        console.log(file);
        // setShow(false);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Upload the file
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Try to Upload the file</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className="file-uploader">
                        <input type="file" onChange={event => setFile(event.target.files[0])} />
                    </div>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Back
                    </Button>
                    <Button variant="outline-success" onClick={update}>
                        Update the database
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
}