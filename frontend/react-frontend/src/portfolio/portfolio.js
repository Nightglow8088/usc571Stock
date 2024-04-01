import React from 'react'

import BuyButton from './buyButton';
import SellButton from './sellButton';

import './portfolio.css'



export default function Portfolio() {
  const [portfolioData, setPortfolioData] = React.useState([]);
  const [portfolioMoney, setPortfolioMoney] = React.useState(0);


  // Fetch portfolio data from your API or handle it however you need
  React.useEffect(() => {
    const fetchPurchaseStock = async () => {
      try {
        const responseMoney = await fetch(`${process.env.REACT_APP_API_URL}/dbFindMoney`);
        const moneyData = await responseMoney.json();
        setPortfolioMoney(moneyData.money)


        const responseStock = await fetch(`${process.env.REACT_APP_API_URL}/dbShowAllBuyedStocks`);
        const stocksData = await responseStock.json();
        
        // Now that we have the stocks data, fetch the prices for each stock
        updatePrices(stocksData);
      } catch (error) {
        console.error("dbShowWatchList error:", error);
      }
    };
  
    const fetchPrice = async (ticker) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/companyLatestPriceOfStock?symbol=${ticker}`);
        const data = await response.json();
        return data.currentPrice; // Assuming the API returns an object with a currentPrice property
      } catch (error) {
        console.error(`Error fetching price for ${ticker}:`, error);
        return null; // In case of error, return null or a default value
      }
    };
  
    const updatePrices = async (stocksData) => {
      const pricePromises = stocksData.map(async (stock) => {
        const price = await fetchPrice(stock.ticker);
        return { ...stock, price: price || stock.price }; // Use existing price if fetch fails
      });
  
      Promise.all(pricePromises)
        .then(updatedData => setPortfolioData(updatedData)); // Update the state with the new data
    };
  
    fetchPurchaseStock();

  }, []);


  const handleMarketValue =(price,quantity) => {
    return (price*quantity).toFixed(2);
  }

  const handleAverageCost =(totalPrice,quantity) => {
    return (totalPrice/quantity).toFixed(2);
  }

  const handleChange =(totalPrice,quantity,price) => {
    const average = totalPrice/quantity;
    return (average-price).toFixed(2);
  }

  return (
    
    <div className="portfolio">
      {/* {console.log(portfolioData)} */}
      <h1>My Portfolio</h1>
      <p className="wallet">Money in Wallet: {portfolioMoney.toFixed(2)}</p>

      {portfolioData.length>0 ?(
      portfolioData.map((stock,index) => {
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
                  <span>Change:</span> <span>{handleChange(stock.totalPrice,stock.quantity,stock.price)}</span>
                </div>
                <div className="portfolio-body-info-detail"> <span>Current Price: </span> <span>{stock.price}</span></div>
                <div className="portfolio-body-info-detail"> <span>Market Value: </span> <span>{handleMarketValue(stock.price,stock.quantity)}</span></div>
              </div>
            </div>
            <div className="portfolio-tail">
              <BuyButton portfolioMoney={portfolioMoney} setPortfolioMoney ={setPortfolioMoney} setPortfolioData={setPortfolioData} stock={stock} />
              {/* <button className="buy">Buy</button> */}
              <SellButton portfolioMoney={portfolioMoney} setPortfolioMoney ={setPortfolioMoney} setPortfolioData={setPortfolioData} stock={stock}/>
              {/* <button className="sell">Sell</button> */}
            </div>
          </div>
        );
      })
      ):null}
    </div>
  );
}


