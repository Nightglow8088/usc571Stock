import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import EmptyResult from './emptyResult'
import { Routes, Route, useParams } from 'react-router-dom';





// const filter = createFilterOptions();

function FreeSoloCreateOption({ value, setValue }) {
    let { ticker } = useParams();

    // const [value, setValue] = React.useState(null);

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
        // 只有当input变化时才触发
        console.log(value)
        const fetchOptions = async () => {

            if (value === ''  || value===null || value === undefined) {
                setOptions([]);
                return;
            }
            try {
                setLoadStatus(true)
                const response = await fetch('http://localhost:3000/Autocomplete?query=' + value);
                const data = await response.json();
                console.log(data)
                if(data.count==0){
                    console.log("no")
                    setShowEmptyResult(true)
                }
                else{
                    setShowEmptyResult(false)
                    // const processedData = data.result.map(item => 
                    //     // symbol: item.symbol,
                    //     // description: item.description
                    //     `${item.symbol} | ${item.description}`
                    // );
                    // // console.log(processedData)

                    // setOptions(processedData); // 假设返回的数据直接是选项数组
                    // setLoadStatus(false)
                    // console.log("endStatus "+ loadStatus)
                    setOptions(data.result.map(item => 
                        `${item.symbol} | ${item.description}`
                    )); 

                }
                setLoadStatus(false)
            } 
            catch (error) {
                console.error('Error fetching data:', error);
                setOptions([]);
            }
        };

        fetchOptions();
    }, [value]); // 监听input的变化

    React.useEffect(()=>{
        console.log(`loadStatus: ${loadStatus}`);
    }, [loadStatus]);


    // const handleChange = (event, newValue) => {
    //     // 分割字符串并取第一部分
    //                 console.log(newValue)
    //     if(newValue!='' && !newValue===null ){
    //         // console.log(newValue)
    //         const symbol = newValue.split(' | ')[0];
    //         setValue(symbol);
    //     }
    //     else {
    //         setValue(newValue);
    //     }
    //   };


  return (
    <div>
        <Autocomplete
        value={value}
        // onChange={(event, newValue) => {
        //     // console.log("newValue "+newValue.symbol)
        //     console.log(newValue)
        //     setValue(newValue);
        //     // console.log(value)
        // }}
        // onChange={handleChange}


        onInputChange={(event, newInputValue) => {
            // Update the input state on input change
            // if (event.type === 'change') {
                setValue(newInputValue.split(' | ')[0])
            // }
        }}

        // selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        //   点击选择symbol
        // getOptionLabel={(option) => {
        //     // console.log(option)
        //     // setValue(option.symbol)
        //     return option.symbol;
        // }}

        // getOptionLabel={(option) => {
        //     // setValue(option.symbol)
        //     return option.symbol
        // }}
        // getOptionLabel={(option) => option.symbol? option.symbol : ''}


        // getOptionLabel={(option) => option?.symbol || ''}



        // renderOption={(props, option) => 
        // {
        //     // console.log(props)
        //     console.log("option "+option.symbol)
        //     return <li {...props}>{option.symbol+" | "+option.description}</li>;
        // }
        // }
        sx={{ width: 600 }}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label="Free solo with text demo" value={value}/>
        )}
        loading={loadStatus}
        loadingText= {<CircularProgress />}
        />

        {showEmptyResult && <EmptyResult />}
    </div>
  );
}
export default FreeSoloCreateOption;