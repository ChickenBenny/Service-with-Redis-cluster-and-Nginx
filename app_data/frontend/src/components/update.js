import { useState } from "react";
import { Wrapper } from "./wrapper";
import ReactDOM from 'react-dom';

export const Update = () => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const submit = async event => {

        const headers = { 'Content-Type': 'application/json' };
        const data = {
            key: key,
            value: value
        };
        const response = await fetch(`http://localhost:8004/${key}`, {
                        method: 'PUT', 
                        headers: headers,
                        body: JSON.stringify(data)
                        });
        const content = await response.json();
        if (content["message"] != "None") {
            const info = <div>Update {key} name as {value}.</div>;
            ReactDOM.render(info, document.getElementById('show'));
        }
        else {
            const info = <div>{key} dose not existing.\nSet{key} as {value}.</div>
            ReactDOM.render(info, document.getElementById('show'));
        }

    }

    return (
        <Wrapper>
            <p className="create-header">Insert Merchant code and Merchant name to database</p>
            <form className="mt-3">
                <div className="form-floating pb-3">
                    <input className="form-control" placeholder="Code"  onChange={event => setKey(event.target.value)}/>
                    <label>Merchant Code</label>
                </div>

                <div className="form-floating pb-3">
                    <input className="form-control" placeholder="Name" onChange={event => setValue(event.target.value)}/>
                    <label>Merchant Name</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" onClick={submit} type="button">Submit</button>

            </form>
            <div id="show"></div>
        </Wrapper>
    )
}