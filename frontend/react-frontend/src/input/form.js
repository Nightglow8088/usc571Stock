import React from 'react'
import Buttons from './buttons.js';
import FreeSoloCreateOption from './inputForm.js'
import './form.css'

export default function Form({ stockName, setStockName }) {
  const [value, setValue] = React.useState(null);


  return (
    <div className="form">
        <div className="inputArea">
          <FreeSoloCreateOption value={value} setValue={setValue}/>
        </div>
        <div className='buttonGroupArea'>
          <Buttons value={value} stockName={stockName} setStockName={setStockName}/>
        </div>
    </div>
  )
}
