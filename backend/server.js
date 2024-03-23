const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

const APIKey = "cn3i9ghr01qvutcdcu9gcn3i9ghr01qvutcdcua0"
const APIKey2 = "4hhuVtDtRFgLTj_PeIvLMRxWqguSxiQi"
 
app.use(morgan('dev'));
app.use(bodyParser.json());

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/companyDescription', async(req, res) => {
    const { ticker } = req.query; 

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

});
 

app.get('/companyHistoricalData', async(req, res) => {
    const { stockTicker, multiplier,timespan, from, to} = req.query; 
    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=${APIKey2}`);
        console.log(response.data)

        const modifiedStocks = response.data.results.map(stock => ({
            date: stock.t,
            stockPrice: stock.c,
            volume: stock.v
        }));

        res.status(200).json(modifiedStocks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/companyLatestPriceOfStock', async(req, res) => {
    const { symbol } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${APIKey}`);
        console.log(response.data)

        const modifiedStocks = {
            'Current Price': response.data.c,
            'Change': response.data.d,
            'Percentage Change': response.data.dp,
            'High Price': response.data.h,
            'Low Price': response.data.l,
            'Opening Price': response.data.o,
            'Previous Closing Price': response.data.pc,
            'Trading Day': response.data.t
        }


        res.status(200).json(modifiedStocks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/Autocomplete', async(req, res) => {
    const { query } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/search?q=${query}&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


app.get('/companyNews', async(req, res) => {
    const { symbol, from, to } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/recommendationTrends', async(req, res) => {
    const { symbol } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/companyInsiderSentiment', async(req, res) => {
    const { symbol } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=2022-01-01&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/companyPeers', async(req, res) => {
    const { symbol } = req.query; 
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${APIKey}`);
        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});



const port = process.env.PORT || 3000;
 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

