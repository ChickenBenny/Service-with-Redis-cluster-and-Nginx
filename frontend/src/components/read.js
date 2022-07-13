import { useState } from "react";
import { Wrapper } from "./wrapper";
import { useNavigate } from 'react-router-dom';

export const Read = () => {
    const [key, setKey] = useState('')
    const navigate = useNavigate();

    const submit = event => {
        const headers = { 'Content-Type': 'application/json' };

        fetch(`http://localhost:8000/get/key`, {
            headers: headers,
            method: 'GET'
        })
    }

    return (
        <Wrapper>
            <p className="create-header">Serch the Merchant Name with Merchant Code</p>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={event => setKey(event.target.value)} />
                        <button class="btn btn-outline-success" type="submit" onClick={submit}>Search</button>
                    </form>
                </div>
            </nav>
            <div className="read-return">
                <button type="submit" >Back</button>
            </div>
        </Wrapper>
    )
}