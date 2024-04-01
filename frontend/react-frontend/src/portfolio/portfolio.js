import React from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import BuyButton from './buyButton';
import SellButton from './sellButton';

import './portfolio.css'



export default function Portfolio() {

  const [portfolioData, setPortfolioData] = React.useState([]);
  const [portfolioMoney, setPortfolioMoney] = React.useState(0);
  const [portfolioPurchasedOrSelledStock, setPortfolioPurchasedOrSelledStock] = React.useState({stockName:"" , type:""});
  const [portfolioOpenAlert, setPortfolioOpenAlert] = React.useState(false);



  React.useEffect(() => {
    const fetchPurchaseStock = async () => {
      try {
        const responseMoney = await fetch(`${process.env.REACT_APP_API_URL}/dbFindMoney`);
        const moneyData = await responseMoney.json();
        setPortfolioMoney(moneyData.money)


        const responseStock = await fetch(`${process.env.REACT_APP_API_URL}/dbShowAllBuyedStocks`);
        const stocksData = await responseStock.json();
        

        updatePrices(stocksData);
      } catch (error) {
        console.error("dbShowWatchList error:", error);
      }
    };
  
    const fetchPrice = async (ticker) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/companyLatestPriceOfStock?symbol=${ticker}`);
        const data = await response.json();
        return data.currentPrice; 
      } catch (error) {
        console.error(`Error fetching price for ${ticker}:`, error);
        return null; 
      }
    };
  
    const updatePrices = async (stocksData) => {
      const pricePromises = stocksData.map(async (stock) => {
        const price = await fetchPrice(stock.ticker);
        return { ...stock, price: price || stock.price }; 
      });
  
      Promise.all(pricePromises)
        .then(updatedData => setPortfolioData(updatedData));
    };
  
    fetchPurchaseStock();

  }, []);

  const handleColorChange = (change) => {
    if (change > 0) return 'green';
    if (change < 0) return 'red';
    return 'black'; 
  };


  const handleMarketValue =(price,quantity) => {
    return (price*quantity).toFixed(2);
  }

  const handleAverageCost =(totalPrice,quantity) => {
    return (totalPrice/quantity).toFixed(2);
  }

  const handleChange =(totalPrice,quantity,price) => {
    const average = totalPrice/quantity;
    return (price-average).toFixed(2);
  }

  const handleChangeTriangle =(change) => {
    if (change > 0) return '▲ ';
    if (change < 0) return '▼ ';
    return " "
  }


  return (
    
    <div className="portfolio">
      <div className="portfolio-alert">
        {(portfolioPurchasedOrSelledStock.stockName!="" && portfolioPurchasedOrSelledStock.type!="")?(
            portfolioPurchasedOrSelledStock.type=="buy" ?(
              portfolioOpenAlert?(
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <Alert icon={false} severity="success" onClose={() => {setPortfolioOpenAlert(false)}}>
                    {portfolioPurchasedOrSelledStock.stockName} bought successfully
                  </Alert>
                </Stack>)
              :null
          ):
            portfolioOpenAlert?(
              <Stack sx={{ width: '100%' }} spacing={1}>
                <Alert icon={false} severity="error" onClose={() => {setPortfolioOpenAlert(false)}}>
                {portfolioPurchasedOrSelledStock.stockName} sold successfully
                </Alert>
              </Stack>)
            :null
        
        ):null}
      </div>

      <div className="portfolio-title">
        <h1>My Portfolio</h1>
        <p className="portfolio-wallet">Money in Wallet: ${portfolioMoney.toFixed(2)}</p>
      </div>

      {portfolioData.length>0 ?(
      portfolioData.map((stock,index) => {
        const changeValue =handleChange(stock.totalPrice,stock.quantity,stock.price)

        const color = handleColorChange(changeValue);
        // console.log(color)


        return (
          <div key={index} className="stock-item">
            <div className='portfolio-header'>
              <h2>{stock.ticker} <span>{stock.companyName}</span></h2>
            </div>
            <div className="portfolio-body">
              <div className="portfolio-body-info">
                <div className="portfolio-body-info-detail"><span>Quantity: </span> <span>{stock.quantity.toFixed(2)}</span></div>
                <div className="portfolio-body-info-detail"><span>Avg.Cost / Share: </span>  <span>{handleAverageCost(stock.totalPrice,stock.quantity)}</span></div>
                <div className="portfolio-body-info-detail"> <span>Total Cost: </span> <span>{stock.totalPrice.toFixed(2)}</span></div>
              </div>

              <div className="portfolio-body-info">
                <div className="portfolio-body-info-detail">
                  <span>Change:</span> <span style={{ color: color }}> {handleChangeTriangle(changeValue)}  {changeValue}</span>
                </div>
                <div className="portfolio-body-info-detail"> <span>Current Price: </span> <span style={{ color: color }}>{stock.price}</span></div>
                <div className="portfolio-body-info-detail"> <span>Market Value: </span> <span style={{ color: color }}>{handleMarketValue(stock.price,stock.quantity)}</span></div>
              </div>
            </div>
            <div className="portfolio-tail">
              <BuyButton portfolioMoney={portfolioMoney} setPortfolioMoney ={setPortfolioMoney} setPortfolioData={setPortfolioData} stock={stock} setPortfolioPurchasedOrSelledStock={setPortfolioPurchasedOrSelledStock} setPortfolioOpenAlert={setPortfolioOpenAlert}/>
              <SellButton portfolioMoney={portfolioMoney} setPortfolioMoney ={setPortfolioMoney} setPortfolioData={setPortfolioData} stock={stock} setPortfolioPurchasedOrSelledStock={setPortfolioPurchasedOrSelledStock} setPortfolioOpenAlert={setPortfolioOpenAlert}/>
            </div>
          </div>
        );
      })
      ):null}
    </div>
  );
}


