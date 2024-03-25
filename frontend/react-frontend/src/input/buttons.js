import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';




export default function Buttons({ value,stockName,setStockName }) {
    let navigate = useNavigate();

    const handleClick = () => {
        console.log("value  "+value); 
        setStockName(value)
        console.log("stockName  "+stockName); 
        navigate("/search/"+value);



    };

    

    return (
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
        >
            <Button onClick={handleClick}>Submit</Button>
            <Button>Two</Button>
        </ButtonGroup>
  )
}
