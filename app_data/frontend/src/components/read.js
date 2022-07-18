import { useState } from "react";
import { Wrapper } from "./wrapper";
import ReactDOM from 'react-dom';

export const Read = () => {
    const [key, setKey] = useState('')

    const submit = async event => {
        const headers = { 'Content-Type': 'application/json' };
        console.log(key);

        const response = await fetch(`http://localhost:8004/get/${key}`, {
                        headers: headers,
                        method: 'GET'
                        });

        const content = await response.json();
        const info = <div>Merchant name : {content["message"]}.</div>;
        ReactDOM.render(info, document.getElementById('show'));
    }
    

    return (
        <Wrapper>
            <p className="create-header">Serch the Merchant Name with Merchant Code</p>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={event => setKey(event.target.value)} />
                        <button class="btn btn-outline-success" type="button" onClick={ submit }>Search</button>

                    </form>

                </div>

            </nav>
            <div id="show"></div>

        </Wrapper>
    )
}