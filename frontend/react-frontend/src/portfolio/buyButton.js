import React from 'react'
import {Modal} from '@mui/material';


export default function BuyButton({portfolioMoney, setPortfolioMoney,setPortfolioData, stock, setPortfolioPurchasedOrSelledStock,setPortfolioOpenAlert}) {
    // console.log(portfolioMoney)
    // console.log(stock)
    const [portfolioBuyStatus, setPortfolioBuyStatus] = React.useState(false);
    const [portfolioStockQuantity, setPortfolioStockQuantity] = React.useState(0);
    const [portfolioTotalStockCost, setPortfolioTotalStockCost] = React.useState(0);

    const [portfolioOverBudget, setPortfolioOverBudget] = React.useState(false);




    const handlePortfolioBuyStatus= (status) =>{
        setPortfolioBuyStatus(status)
        setPortfolioStockQuantity(0)
        setPortfolioTotalStockCost(0)
        setPortfolioOverBudget(false)
    }

    //点击之后
    const handlePortfolioChange = (event) => {
        //输入的数量
        const quantityNum = event.target.value;
        setPortfolioStockQuantity(quantityNum);
        //算出的价格
        const total = quantityNum * stock.price
        setPortfolioTotalStockCost(total)

        // 数据库的钱减去买股票的钱
        const price = portfolioMoney - total;

        //缺钱不够
        if(price<0){
            setPortfolioOverBudget(true)
        }
        else{
            setPortfolioOverBudget(false)
        }
    };

    const handlePortfolioBuy =() =>{
        // 复制原有状态中的所有字段 将新买的quantity数量加上
        stock= { ...stock, quantity: stock.quantity + parseFloat(portfolioStockQuantity),totalPrice: stock.totalPrice + parseFloat(portfolioTotalStockCost) };
        setPortfolioData((currentData) => {
            return currentData.map((item) => {
                if (item.ticker === stock.ticker) {
                    // Return the updated stock data
                    return stock;
                }
                // Return all other items unchanged
                return item;
            });
        });
        setPortfolioTotalStockCost(0)

        setPortfolioBuyStatus(false)
        
        setPortfolioOpenAlert(true)
        setPortfolioPurchasedOrSelledStock({stockName:stock.ticker, type:"buy"})
        console.log(stock)

        const apiUrl = `${process.env.REACT_APP_API_URL}/dbUpdateStockMoney?ticker=${stock.ticker}&newQuantity=${portfolioStockQuantity}&newPrice=${portfolioTotalStockCost}&companyName=${stock.companyName}&type=buy`;
      
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data)
            setPortfolioMoney(data.money)
            setPortfolioStockQuantity(0)
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }


    

  return (
    <div className="portfolioButtonContainer">
        <button className="buy" onClick={() => handlePortfolioBuyStatus(true)}>Buy</button>  

        {(portfolioMoney && stock!== null)? (
            <Modal open={portfolioBuyStatus}>
                <div className="modal-content">
                    <button className="closeButton" onClick={() => handlePortfolioBuyStatus(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    <h1 className="modal-title">{stock.ticker.toUpperCase()}</h1>
                    <div className="modal-stockInfo">
                        <p>Current Price: ${stock.price.toFixed(2)}</p>
                        <p>Money in Wallet: ${portfolioMoney.toFixed(2)}</p>
                        <div>
    
                            <label htmlFor="quantity">Quantity: </label>
                            <input type="number" id="quantity" className ="modal-input" name="quantity" min="0" value={portfolioStockQuantity} onChange={handlePortfolioChange}/>
                            {portfolioOverBudget?
                                <p id='modal-overBudgetWarning'>Not enough money in wallet</p>
                            : null}
                        </div>
                    
                    </div>
                    
                    <div className="social-totalValue">
                        <span>Total: {portfolioTotalStockCost.toFixed(2)}</span>
                        <button className="buy-button" 
                                disabled={portfolioOverBudget} 
                                style={{ backgroundColor: portfolioOverBudget ? "#9bbf9c" : '#47b74b' }}
                                onClick={handlePortfolioBuy}>Buy</button>
                    </div>
                </div>
            </Modal>
            ) 
        : null}

    </div>
    
    
    
    
    )
}
