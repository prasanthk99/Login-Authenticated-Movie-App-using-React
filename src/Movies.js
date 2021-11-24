import React, { useState, useEffect } from "react";
import './App.css'
import NavBar from './NavBar'


const Movies = () => {
    useEffect(() => {
        fetchdata("https://demo.credy.in/api/v1/maya/movies/")
    }, [])
    const [datas, setdatas] = useState([]);
    const [Loading, checkloaded] = useState(true);
    const [Json, setJson] = useState();
    const [url, seturl] = useState("https://demo.credy.in/api/v1/maya/movies/");
    const [disable, setdisable] = useState(false);
    const [opac, setopacity] = useState("1");


    const fetchdata = (weburl = "https://demo.credy.in/api/v1/maya/movies/") => {
        checkloaded(false);
        setdisable(true);
        setopacity("0.7");
        let token = localStorage.getItem('token');
        fetch(weburl, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        })
            .then((r) => r.json())
            .then((D) => {
                setdatas(D.results); setJson(D);
                setdisable(false);
                setopacity("1");
                checkloaded(true);
            })
            .catch(err => { console.log(err) });
    }

    return (
        <>
            <NavBar />
            <div className="movies">
                {(Loading) ?
                    (datas === undefined) ? <h1>Click Reload Button</h1> :
                        datas.map((data) => {
                            const { uuid, title, description, genres } = data;
                            return (
                                <div className="movie" key={uuid}>
                                    <img src={"https://ui-avatars.com/api/?name=Prasanth+K"} alt="" />
                                    <h1>{title}</h1>
                                    <p>{description}</p>
                                    <br />
                                    <p>{genres}</p>
                                </div>
                            )
                        }) : <h1>Loading... Please wait</h1>
                }
            </div >
            <div className="bottom-btns" >
                <button style={{ opacity: `${opac}` }}
                    onClick={(e) => {
                        seturl(Json.previous); fetchdata(Json.previous);

                    }} disabled={disable}>Previous</button>

                <button onClick={(e) => fetchdata(url)} >Reload</button>

                <button style={{ opacity: `${opac}` }}
                    onClick={(e) => {
                        seturl(Json.next); fetchdata(Json.next);

                    }} disabled={disable}>Next</button>
            </div>
        </>
    )

}

export default Movies;