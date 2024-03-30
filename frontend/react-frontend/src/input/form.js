import React from 'react'
import Buttons from './buttons.js';
import FreeSoloCreateOption from './inputForm.js'
import './form.css'

// export default function Form({ stockName, setStockName }) {
  export default function Form() {
    const [value, setValue] = React.useState('');


    return (
      <div className="form">
          <div className="inputArea">
            <FreeSoloCreateOption value={value} setValue={setValue} />
          </div>

      </div>
  )
}
