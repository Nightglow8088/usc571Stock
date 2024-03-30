import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import EmptyResult from './emptyResult'
import { Routes, Route, useParams ,useNavigate} from 'react-router-dom';
import './inputForm.css'


function FreeSoloCreateOption({ value, setValue }) {
    let { ticker } = useParams();

    let navigate = useNavigate();

    const [options, setOptions] = React.useState([]);

    const [loadStatus, setLoadStatus] = React.useState(false);


    const [showEmptyResult, setShowEmptyResult] = React.useState(false);

    React.useEffect(() => {
        if(ticker!='home'){
            console.log("change ticker "+ticker)
            setValue(ticker);
        }
    },[ticker, setValue])



    React.useEffect(() => {

        const fetchOptions = async () => {

            if (value === ''  || value===null || value === undefined) {
                setOptions([]);
                return;
            }
            try {
                setLoadStatus(true)


                const response = await fetch(`${process.env.REACT_APP_API_URL}/Autocomplete?query=${value}`);
                const data = await response.json();
                // console.log(data)
                if(data.count==0){
                    // console.log("no")
                    setShowEmptyResult(true)
                }
                else{
                    setShowEmptyResult(false)
                    setOptions(data.result.map(item => 
                        `${item.symbol} | ${item.description}`
                    )); 

                }


                setLoadStatus(false)
            } 
            catch (error) {
                console.error('Autocomplete error:', error);
                setOptions([]);
            }
        };

        fetchOptions();
    }, [value]); 

    React.useEffect(()=>{
        console.log(`loadStatus: ${loadStatus}`);
    }, [loadStatus]);



    const handleSearch = () => {
        navigate("/search/"+value);
    };

    const handleClean=() =>{
        setShowEmptyResult(false)
        setValue('')
        navigate("/search/home");
    }



  return (
    <div>
        <h2 className='inputForm-title'>Stock Search</h2>
        <Autocomplete
        value={value}


        onInputChange={(event, newInputValue) => {
                setValue(newInputValue.split(' | ')[0])
        }}


        options={options}

        sx={{ width: 700 }}
        freeSolo
        renderInput={(params) => (
            <>
                <div ref={params.InputProps.ref} class="input-group">
                    <input {...params.inputProps} 
                        value={value}
                        type="text" class="form-control" placeholder="Recipient's username" />
                    <button onClick={handleSearch} class="btn btn-outline-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                    <button onClick={handleClean} class="btn btn-outline-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </>


        )}
        loading={loadStatus}
        loadingText= {<CircularProgress />}
        />

        {showEmptyResult && <EmptyResult />}
    </div>
  );
}
export default FreeSoloCreateOption;