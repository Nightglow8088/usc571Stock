import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import EmptyResult from './emptyResult'




const filter = createFilterOptions();

function FreeSoloCreateOption({ value, setValue }) {
    // const [value, setValue] = React.useState(null);

    const [options, setOptions] = React.useState([]);

    const [loadStatus, setLoadStatus] = React.useState(false);

    const [input, setInput] = React.useState('');

    const [showEmptyResult, setShowEmptyResult] = React.useState(false);


//   const loading = open && options.length === 0;


    React.useEffect(() => {
        // 只有当input变化时才触发
        const fetchOptions = async () => {

            if (input === '') {
                setOptions([]);
                return;
            }
            try {
                setLoadStatus(true)
                const response = await fetch('http://localhost:3000/Autocomplete?query=' + input);
                const data = await response.json();
                if(data.count==0){
                    setShowEmptyResult(true)
                }
                else{
                    setShowEmptyResult(false)
                    const processedData = data.result.map(item => ({
                        symbol: item.symbol,
                        description: item.description
                    }));

                    setOptions(processedData); // 假设返回的数据直接是选项数组

                    setLoadStatus(false)
                    console.log(options)
                }
            } 
            catch (error) {
                console.error('Error fetching data:', error);
                setOptions([]);
            }
        };

        fetchOptions();
    }, [input]); // 监听input的变化


  return (
    <>
        <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            console.log("newValue "+newValue.symbol)

            setValue(newValue);
            console.log(value)
        }}

        //   管理实时输入的值
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // 这个就是输入的值
            // setInput(params)
            const { inputValue } = params;
            setInput(inputValue)

            console.log("inputValue "+inputValue)

            return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        //   点击选择symbol
        getOptionLabel={(option) => {
            console.log(option)
            return option.symbol;
        }}
        renderOption={(props, option) => 
        {
            console.log(props)
            console.log("option "+option)
            return <li {...props}>{option.symbol+" | "+option.description}</li>;
        }
        }
        sx={{ width: 600 }}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label="Free solo with text demo" />
        )}
        loading={loadStatus}
        loadingText= {<CircularProgress />}
        />

        {showEmptyResult && <EmptyResult />}
    </>
  );
}
export default FreeSoloCreateOption;