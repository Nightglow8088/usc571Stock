import React from 'react'
import './watchList.css'

export default function WatchList() {
  const [stocks, setStocks] = React.useState([]);
  const [prices, setPrices] = React.useState([]);

  React.useEffect(() => {
    const fetchStocks = async () => {
      try {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/dbShowWatchList`);
        const stocksData = await response.json();
        setStocks(stocksData);
  
        const pricesPromises = stocksData.map(async (stock) => {
          const stockResponse = await fetch(`${process.env.REACT_APP_API_URL}/companyLatestPriceOfStock?symbol=${stock.ticker}`);
          const stockPriceDetails = await stockResponse.json();
          return stockPriceDetails; 
        });
  
        Promise.all(pricesPromises).then((allPrices) => {
          setPrices(allPrices); 
        });

      } catch (error) {
        console.error("dbShowWatchList error:", error);
      }

    };

    fetchStocks();
  }, []); 


  const handleDelete = async (index,ticker) => {
    // 使用filter方法创建不包含指定索引项的新数组
    const newStocks = stocks.filter((_, i) => i !== index);
    const newPrices = prices.filter((_, i) => i !== index);

    // 更新状态以反映删除
    setStocks(newStocks);
    setPrices(newPrices);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/dbDeleteWatchList?ticker=${ticker}`);
    const deletedInfo = await response.json();
    console.log(deletedInfo)
    
  };

  return (
    (stocks.length>0 && prices.length>0)?(
      <div className="watchlist-container">
        <h2>My Watchlist</h2>
        <div className="watchlist">
          {stocks.map((stock, index) => (
            <div className='stock-info'  key={index}>
            <button className="remove-button" onClick={() => handleDelete(index,stock.ticker)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>

              <div className="watchlist-item">
                <div className="ticker-section">
                  <div>
                    <p className="ticker">{stock.ticker}</p>
                    <p className="company-name">{stock.companyName}</p>
                  </div>
                </div>
                <div className="price-section">
                  <p className="current-price">{prices[index].currentPrice}</p>
                  <p className="price-change">{prices[index].Change+" "+prices[index].percentageChange}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ): null

  )
}
