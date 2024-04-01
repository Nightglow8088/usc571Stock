import React from 'react'
import {Modal} from '@mui/material';


export default function SellButton({portfolioMoney, setPortfolioMoney,setPortfolioData, stock}) {

    const [portfolioSellStatus, setPortfolioSellStatus] = React.useState(false);

    const [portfolioStockQuantity, setPortfolioStockQuantity] = React.useState(0);
    const [portfolioTotalStockGet, setPortfolioTotalStockGet] = React.useState(0);

    const [portfolioOverQuantity, setPortfolioOverQuantity] = React.useState(false);

    const handlePortfolioSellStatus= (status) =>{
        setPortfolioSellStatus(status)
        setPortfolioStockQuantity(0)
        setPortfolioTotalStockGet(0)
        setPortfolioOverQuantity(false)
    }

    const handleSellChange = (event) => {
        const maxQuantityNum = stock.quantity;
        // console.log(maxQuantityNum)
        const quantityNum = event.target.value;
        setPortfolioStockQuantity(quantityNum);

        const total = quantityNum * stock.price
        setPortfolioTotalStockGet(total)


        if(maxQuantityNum<quantityNum){
            setPortfolioOverQuantity(true)
        }
        else{
            setPortfolioOverQuantity(false)
        }
    };

    const handleSell=()=>{
        //当把所有股票都卖光了 关闭sell按钮 exist设置为false
        const currentExistedQuantity =stock.quantity -  parseFloat(portfolioStockQuantity)
        // let deleteCurrentStock = false
        if(currentExistedQuantity==0){
            console.log("卖完了 "+currentExistedQuantity)
            setPortfolioData(currentData => currentData.filter(item => item.ticker !== stock.ticker));

        }
        else{
            console.log("没卖完 "+currentExistedQuantity)

            stock= { ...stock, quantity: currentExistedQuantity, totalPrice: stock.totalPrice - parseFloat(portfolioTotalStockGet) };

            setPortfolioData((currentData) => {
                return currentData.map((item) => {
                    if (item.ticker === stock.ticker) {
                        return stock;
                    }
                    // Return all other items unchanged
                    return item;
                });
            });
        }


        const apiUrl = `${process.env.REACT_APP_API_URL}/dbSellStockMoney?ticker=${stock.ticker.toUpperCase()}&newQuantity=${portfolioStockQuantity}&newPrice=${portfolioTotalStockGet.toFixed(2)}`;
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setPortfolioMoney(data.money)
            handlePortfolioSellStatus(false)
          })
          .catch(error => {
            console.error('Error:', error);
          });

    }


  return (
    <div className='portfolioButtonContainer'>
        <button className="sell" onClick={() => handlePortfolioSellStatus(true)}>Sell</button>

        {(portfolioMoney && stock!== null) ? (
            <Modal open={portfolioSellStatus}>
                <div className="modal-content">
                    <button className="closeButton" onClick={() => handlePortfolioSellStatus(false)}>
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
                            <input type="number" id="quantity" className ="modal-input" name="quantity" min="0" value={portfolioStockQuantity} onChange={handleSellChange}/>
                            {portfolioOverQuantity?
                                <p id='modal-overBudgetWarning'>You cannot sell the stocks that you don't have!</p>
                            : null}
                        </div>
                    
                    </div>
                    
                    <div className="social-totalValue">
                        <span>Total: {portfolioTotalStockGet.toFixed(2)}</span>
                        <button className="buy-button" 
                                disabled={portfolioOverQuantity} 
                                style={{ backgroundColor: portfolioOverQuantity ? "#9bbf9c" : '#47b74b' }}
                                onClick={handleSell}>Sell</button>
                    </div>
                </div>
            </Modal>
            ) 
        : null}
    </div>

  )
}
