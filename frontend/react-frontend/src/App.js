import React, { useState } from 'react' 
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';

// import './App.css';
import NavBar from './navBar/navBar'
import BasicDetails from './basicDetails/basicDetails'
import WholePage from './wholePages/wholePages'
import WatchList from './watchList/watchList';
import Portfolio from './portfolio/portfolio';
import Footer from './footer/footer';


function App() {
  const [currentSearchTicker, setCurrentSearchTicker] = React.useState('');
  return (
    <BrowserRouter>
      <div className='app-body'>
          <NavBar currentSearchTicker={currentSearchTicker}/>

          <Routes>
            <Route path="/" element={<Navigate replace to="/search/home" />} />
            <Route path="/search/:ticker" element={ <BasicDetails currentSearchTicker={currentSearchTicker} setCurrentSearchTicker={setCurrentSearchTicker}/> } />
            <Route path="/watchlist" element={ <WatchList /> } />
            <Route path="/portfolio" element={ <Portfolio /> } />

        </Routes>

        <Footer/>
      </div>
   </BrowserRouter>
  );
}

export default App;
