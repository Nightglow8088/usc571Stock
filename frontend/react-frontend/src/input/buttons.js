import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';


export default function Buttons({ value,stockName,setStockName }) {
    const handleClick = () => {
        console.log("value  "+value.symbol); 
        setStockName(value.symbol)
        console.log("stockName  "+stockName); 

    };

    

    return (
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
        >
            <Button onClick={handleClick}>One</Button>
            <Button>Two</Button>
        </ButtonGroup>
  )
}
