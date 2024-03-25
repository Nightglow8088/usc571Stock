import React from 'react'
import './basicDetails.css'
import { Routes, Route, useParams } from 'react-router-dom';
import WholeComponents from '../fourComponents/wholeComponents';


export default function BasicDetails() {
    let { ticker } = useParams();
    const [detail, setDetail] = React.useState(null);
    const [latestPrice, setLatestPrice] = React.useState(null);
    const [companyPeers, setCompanyPeers] = React.useState(null);
    const [marketOpen, setMarketOpen] = React.useState(false);
    const [positiveChange, setPositiveChange] = React.useState(false);


    function unixToDate (unixTimestamp){
        const date = new Date(unixTimestamp * 1000);
        const year = date.getFullYear();
        // getMonth返回的月份从0开始，所以需要+1；padStart确保月和日为两位数
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    //逻辑应该和想要的有些出入 毕竟下午一点关市场而不是零点
    function sameDateOrNot (unixTimestamp){
        const date1 = new Date(unixTimestamp * 1000);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 将今天的时间设置为午夜12点（开始），确保只比较日期部分
        if(date1.getFullYear() === today.getFullYear() && date1.getMonth() === today.getMonth() && date1.getDate() === today.getDate()){
            setMarketOpen(true)
        }
        else{
            setMarketOpen(false)
        }
      
        
    }



    React.useEffect(() => {
        if(ticker!='home'){
            console.log("ticker change: "+ticker)
            const fetchDescription = fetch(`http://127.0.0.1:3000/companyDescription?ticker=${ticker}`)
                .then(response => response.json());

            const fetchLatestPrice = fetch(`http://127.0.0.1:3000/companyLatestPriceOfStock?symbol=${ticker}`)
                .then(response => response.json());

            const fetchCompanyPeers = fetch(`http://127.0.0.1:3000/companyPeers?symbol=${ticker}`)
                .then(response => response.json());

            Promise.all([fetchDescription, fetchLatestPrice,fetchCompanyPeers])
            .then(([descriptionData, latestPriceData,companyPeersData]) => {
                sameDateOrNot(latestPriceData.tradingDay)
                setPositiveChange(latestPriceData.Change>=0)
                setCompanyPeers(companyPeersData)
                setDetail(descriptionData);
                setLatestPrice(latestPriceData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


            // fetch('http://127.0.0.1:3000/companyDescription?ticker='+ticker)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         setDetail(data);
            //     })
            //     .catch(error => {
            //         console.error('Error fetching data:', error);

            //     });
        }
      }, [ticker]); 

    if(ticker=='home'){
        return null;
    }




  return (
    <>
        {/* <Form stockName={stockName} setStockName={setStockName}/> */}
        <div className="stock-card">

            <div className="stock-header">
                <div>
                    <span className="stock-symbol">{ticker.toUpperCase()}</span>
                    <span className="stock-favorite">&#9733;</span>
                </div>
                <span className="stock-name">{detail?.name || null}</span>
                <div className="stock-exchange">{detail?.exchange || null}</div>
                <div>
                    <button className="buy-button">Buy</button>
                    <button className="buy-button">Sell</button>
                </div>
            </div>

            <div className="stock-body">
                <img className="stock-logo" src={detail?.logo || null} alt="Logo"></img>
                <span className={`market-status ${marketOpen ? 'greenWords' : 'redWords'}`}>
                    {latestPrice? ( marketOpen ? 'Market is Open' : 'Market closed on ' +unixToDate(latestPrice.tradingDay) ) : null }
                </span>
            </div>

            <div className="stock-price">
                <span className={`current-price ${positiveChange ? 'greenWords' : 'redWords'}`}>{latestPrice?.previousClosingPrice || null}</span>
                <span className={`price-change ${positiveChange ? 'greenWords' : 'redWords'}`}> {latestPrice?( positiveChange? "▲" + latestPrice.Change  : "▼" + latestPrice.Change ) : null} ({latestPrice?.percentageChange || null}%)</span>
                <div className="time-status">
                <   span className="timestamp">{latestPrice?unixToDate(Math.round(new Date().getTime()/1000)) : null}</span>
                </div>
            </div>

        </div>

        <div>
            <WholeComponents ticker={ticker} latestPrice={latestPrice} detail={detail} companyPeers={companyPeers}/>
        </div>
    </>
  )
}

