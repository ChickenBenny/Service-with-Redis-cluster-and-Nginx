import { useState } from "react";
import { Wrapper } from "./wrapper";
import {useNavigate} from 'react-router-dom';

export const MerchantsCreate = () => {
    const [key, setKey] = useState('code');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const submit = event => {

        const headers = { 'Content-Type': 'application/json' }
        const data = {
            "key": key,
            "value": value
        }
        fetch('http://localhost:8000/get', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // fetch('http://localhost:8000/get/', {
        //     method: 'POST', headers: {'Content-Type': 'application/create/json'}, body: JSON.stringify({
        //         'key': key,
        //         'value': value
        //     })
        // });

        // console.log(JSON.stringify({
        //     'key': key,
        //     'value': value
        // }));

        //  navigate(-1);
    }

    return (
        <Wrapper>
            <p className="create-header">Insert Merchant code and Merchant name to database</p>
            <form className="mt-3">
                <div className="form-floating pb-3">
                    <input className="form-control" placeholder={key}  onChange={event => setKey(event.target.value)}/>
                    <label>Merchant Code</label>
                </div>

                <div className="form-floating pb-3">
                    <input className="form-control" placeholder="Name" onChange={event => setValue(event.target.value)}/>
                    <label>Merchant Name</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" onClick={submit} type="button">Submit</button>

            </form>
        </Wrapper>
    )
}