import React from 'react'

import './App.css';
import NavBar from './navBar/navBar'
import Form from './input/form'
import BasicDetails from './basicDetails/basicDetails'

function App() {
  const [stockName, setStockName] = React.useState('');


  return (
    <>
      <NavBar />
      <Form stockName={stockName} setStockName={setStockName}/>
      <BasicDetails />
    </>
  );
}

export default App;
