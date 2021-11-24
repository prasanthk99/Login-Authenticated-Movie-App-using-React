import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Errormodal from "./Errormodal";

function Form() {
    const initialvalue = { username: "", password: "" };

    const history = useNavigate();

    const [values, setvalues] = useState(initialvalue);
    const [error, seterror] = useState(false)
    const [errormsg, seterrormsg] = useState("error");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalues({ ...values, [name]: value });
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history('/movie')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.username === "" && values.password === "") {
            seterror(true)
            seterrormsg("Username and password cannot be empty")
        }

        else if (values.username === "testuser" && values.password === "ruDWLeHr9K7ErsUS") {
            if (localStorage.getItem("token") === null) {
                const da = {
                    'username': `${values.username}`,
                    'password': `${values.password}`
                }
                await axios.post('https://demo.credy.in/api/v1/usermodule/login/', da)
                    .then(req => {
                        let token = req.data.data.token;
                        localStorage.setItem('token', token);
                        console.log(token);
                    })
                    .catch(err => { console.log(err) });
            }
            history('movie');
        }
        else {
            seterror(true)
            seterrormsg("Invalid Username and password")

        }

    }

    return (
        <>
            {error && <Errormodal error={seterror} msg={errormsg} />}
            <div className="form">
                <form >
                    <label>UserName:</label>
                    <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} required />
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required />
                    <button type="submit" onClick={handleSubmit}>SUBMIT</button>
                </form>
            </div>

        </>
    )
}

export default Form;