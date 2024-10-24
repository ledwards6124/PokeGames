import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz';
import Search from './Search';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';



function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}/>
        <Route path='/search' element={<Search />} /> search'
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </BrowserRouter>

    
    </>
  );
}

export default App;
