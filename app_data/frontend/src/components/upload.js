import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';


export const Upload = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [file, setFile] = useState(null);
    const update = () => {
        var formdata = new FormData();
        formdata.append("file", file, file.name);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8004/uploadfile", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        const info = <div>Upload Success.</div>
        ReactDOM.render(info, document.getElementById('upload-response'));
        setShow(false);
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
                    <div id="upload-response"></div>
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