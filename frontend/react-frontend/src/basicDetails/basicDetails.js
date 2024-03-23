import React from 'react'
import './basicDetails.css'

export default function BasicDetails() {



  return (
    <>
        <div class="stock-card">

            <div class="stock-header">
                <div>
                    <span class="stock-symbol">AAPL</span>
                    <span class="stock-favorite">&#9733;</span>
                </div>
                <span class="stock-name">Apple Inc</span>
                <div class="stock-exchange">NASDAQ NMS - GLOBAL MARKET</div>
                <button class="buy-button">Buy</button>
            </div>

            <div class="stock-body">
                <img class="stock-logo" src="https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.svg" alt="Apple Logo"></img>
                <span class="market-status">Market is Open</span>
            </div>

            <div class="stock-price">
                <span class="current-price">184.15</span>
                <span class="price-change">▲ 1.83 (1.00%)</span>
                <div class="time-status">
                <span class="timestamp">2024-01-22 10:53:37</span>
                </div>
            </div>

        </div>
    </>
  )
}

