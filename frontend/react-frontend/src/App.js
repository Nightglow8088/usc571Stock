import React from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  // const [stockName, setStockName] = React.useState('');


  return (
    <BrowserRouter>
      <NavBar />
      <WholePage />

      <Routers/>

   </BrowserRouter>
  );
}

export default App;
