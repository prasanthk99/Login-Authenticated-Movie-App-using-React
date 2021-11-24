import React from "react";
import './App.css'

const Errormodal = ({ error, msg }) => {
    setTimeout(() => error(false), 1500);

    return (
        <h2 className="errormodal">{msg}</h2>
    )
}

export default Errormodal;