import React from 'react' 
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import './App.css';
import NavBar from './navBar/navBar'
import BasicDetails from './basicDetails/basicDetails'
import WholePage from './wholePages/wholePages'

function Routers() {
  return (
    
    <Routes>
        {/* <Route path="/" element={ <WholePage/> } /> */}
        {/* <Route path="/search/home" Component={ WholePage } /> */}
        <Route path="/search/:ticker" Component={ BasicDetails } />
        {/* <Route path="" element={ <Contact/> } /> */}
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
