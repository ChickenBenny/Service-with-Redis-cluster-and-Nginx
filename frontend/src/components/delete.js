import { useState } from "react";
import { Wrapper } from "./wrapper";
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';


export const Delete = () => {
    const [key, setKey] = useState('')

    const submit = async event => {
        const headers = { 'Content-Type': 'application/json' };
        console.log(key);

        const response = await fetch(`http://localhost:8000/delete/${key}`, {
            headers: headers,
            method: 'DELETE'
            });
        const content = await response.json();
        if (content["message"] != "None"){
            const info = <div>Delete {key} success!</div>;
            ReactDOM.render(info, document.getElementById('show'));
        }
        else {
            const info = <div>Merchant Code does not exit.</div>
            ReactDOM.render(info, decodeURI.getElementById('show'));
        }
    }
    return (
        <Wrapper>
            <p className="create-header">Delete the Merchant Code and Merchant Name</p>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Delete" onChange={event => setKey(event.target.value)} />
                        <button class="btn btn-outline-success" type="button" onClick={ submit }>Delete</button>

                    </form>

                </div>

            </nav>
            <div id="show"></div>

        </Wrapper>
    )
}