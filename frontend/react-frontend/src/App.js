import React, { useState } from 'react' 
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';

import './App.css';
import NavBar from './navBar/navBar'
import BasicDetails from './basicDetails/basicDetails'
import WholePage from './wholePages/wholePages'
import WatchList from './watchList/watchList';
import Portfolio from './portfolio/portfolio';



function Routers() {

  return (
    
    <Routes>
        <Route path="/" element={<Navigate replace to="/search/home" />} />

        {/* <Route path="/search/home" Component={ WholePage } /> */}
        <Route path="/search/:ticker" Component={ BasicDetails } />
        <Route path="/watchlist" element={ <WatchList/> } />
        <Route path="/portfolio" element={ <Portfolio/> } />

    </Routes>
  )
}


function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routers/>

   </BrowserRouter>
  );
}

export default App;
