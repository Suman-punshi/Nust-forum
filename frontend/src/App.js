import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from './components/card';
import IndividualPost from './components/individualpost'; 
import Navbar from './components/navbar'; 

function App() {

  return (
    <div className="container">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/post/:postId" element={<IndividualPost />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;