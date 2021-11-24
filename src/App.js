import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from "./form";
import Movies from './Movies';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Form />} />
          <Route exact path="/movie" element={<Movies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
