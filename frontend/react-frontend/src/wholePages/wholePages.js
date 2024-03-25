import React from 'react'

import NavBar from '../navBar/navBar'
import Form from '../input/form'
import BasicDetails from '../basicDetails/basicDetails'

function WholePage( ) {
  const [stockName, setStockName] = React.useState('');


  return (
    <div>
      {/* <NavBar /> */}
      <Form stockName={stockName} setStockName={setStockName} />
      {/* <BasicDetails /> */}
    </div>
  );
}

export default WholePage;
