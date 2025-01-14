const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

const { findCurrentMoney ,updateStockMoney,updateStockMoneySell,tickerExist, findWatchList,insertWatchList,deleteWatchList,existWatchList,showAllBuyedStocks} = require('./mongodb'); 


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
    // stockTicker = stockTicker.
    // console.log(stockTicker);

    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockTicker.toUpperCase()}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=${APIKey2}`);
        // console.log(response.data)

        const modifiedStocks = response.data.results.map(stock => ({
            date: stock.t,
            closePrice: stock.c,
            volume: stock.v,
            highPrice: stock.h,
            lowPrice: stock.l,
            openPrice: stock.o,
            transactions: stock.n,
            weighted: stock.vw
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
            'currentPrice': response.data.c,
            'Change': response.data.d,
            'percentageChange': response.data.dp,
            'highPrice': response.data.h,
            'lowPrice': response.data.l,
            'openingPrice': response.data.o,
            'previousClosingPrice': response.data.pc,
            'tradingDay': response.data.t
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
        // res.status(200).json(response.data);
        
        //gpt发力了
        const validArticles = response.data.filter(article => {
          // Check if any of the article properties is null or empty string
          return Object.values(article).every(value => value !== null && value !== '');
        }).slice(0, 20); // Get only the first 20 items

        res.status(200).json(validArticles);
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


app.get('/companyEarnings', async(req, res) => {
  const { symbol } = req.query; 
  try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${APIKey}`);
      const sanitizedData = response.data.map(item => {
        Object.keys(item).forEach(key => {
          if (item[key] === null) {
            item[key] = 0; // Replace null with 0
          }
        });
        return item;
      });
      res.status(200).json(sanitizedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


//database mongodb:
// app.get('/dbtest', async (req, res) => {
//   try {
//     await main();
//     res.send('Database operation was successful');
//   } catch (error) {
//     console.error('Database operation failed', error);
//     res.status(500).send('Database operation failed');
//   }
// });


app.get('/dbFindMoney', async (req, res) => {
  try {
    const money = await findCurrentMoney();
    res.send(money);
  } catch (error) {
    console.error('dbFindMoney failed', error);
    res.status(500).send('dbFindMoney failed');
  }
});

app.get('/dbUpdateStockMoney', async (req, res) => {
  const { ticker,newQuantity,newPrice ,companyName} = req.query; 
  const newQuantityInt = parseInt(newQuantity, 10);
  const newPriceInt = parseFloat(newPrice);
  try {
    const newData = await updateStockMoney(ticker.toUpperCase(),newQuantityInt,newPriceInt, companyName);
    res.send(newData);
  } catch (error) {
    console.error('dbAddStock failed', error);
    res.status(500).send('dbAddStock failed');
  }
});


app.get('/dbSellStockMoney', async (req, res) => {
  const { ticker,newQuantity, newPrice} = req.query; 
  const newQuantityInt = parseInt(newQuantity, 10);
  const newPriceInt = parseFloat(newPrice);
  try {
    const newData = await updateStockMoneySell(ticker.toUpperCase(),newQuantityInt,newPriceInt);
    res.send(newData);
  } catch (error) {
    console.error('dbAddStock failed', error);
    res.status(500).send('dbAddStock failed');
  }
});

app.get('/dbTickerExist', async (req, res) => {
  const { ticker} = req.query; 

  try {
    const result = await tickerExist(ticker.toUpperCase());
    res.send(result);
  } catch (error) {
    console.error('dbTickerExist failed', error);
    res.status(500).send('dbTickerExist failed');
  }
});

//WATCHLIST
app.get('/dbShowWatchList', async (req, res) => {

  try {
    // console.log("dbShowWatchList")
    const result = await findWatchList();
    res.send(result);
  } catch (error) {
    console.error('dbShowWatchList failed', error);
    res.status(500).send('dbShowWatchList failed');
  }
});



app.get('/dbInsertWatchList', async (req, res) => {
  const { ticker, companyName} = req.query; 
  try {

    const result = await insertWatchList(ticker.toUpperCase(),companyName);
    res.send(result);
  } catch (error) {
    console.error('dbInsertWatchList failed', error);
    res.status(500).send('dbInsertWatchList failed');
  }
});


app.get('/dbDeleteWatchList', async (req, res) => {
  const { ticker} = req.query; 
  try {

    const result = await deleteWatchList(ticker.toUpperCase());
    res.send(result);
  } catch (error) {
    console.error('dbDeleteWatchList failed', error);
    res.status(500).send('dbDeleteWatchList failed');
  }
});


app.get('/dbExistWatchList', async (req, res) => {
  const { ticker} = req.query; 
  try {

    const result = await existWatchList(ticker.toUpperCase());
    res.send(result);
  } catch (error) {
    console.error('dbExistWatchList failed', error);
    res.status(500).send('dbExistWatchList failed');
  }
});

app.get('/dbShowAllBuyedStocks', async (req, res) => {

  try {
    const result = await showAllBuyedStocks();
    res.send(result);
  } catch (error) {
    console.error('dbShowAllBuyedStocks failed', error);
    res.status(500).send('dbShowAllBuyedStocks failed');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


