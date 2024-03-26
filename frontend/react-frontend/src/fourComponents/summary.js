import React from 'react'
import './summary.css';
import SummaryLineChart from './summaryLineChart';


function Summary({latestPrice,detail,companyPeers}) {

//   console.log(latestPrice)

  return (
    <div className="stock-details-container">
      <div className="summary-section">
        <div className="price-info">
          <div><span className="summary-titles">High Price: </span>{latestPrice?.highPrice || null}</div>
          <div><span className="summary-titles">Low Price: </span>{latestPrice?.lowPrice || null}</div>
          <div><span className="summary-titles">Open Price: </span>{latestPrice?.openingPrice || null}</div>
          <div><span className="summary-titles">Prev. Close: </span>{latestPrice?.previousClosingPrice || null}</div>
        </div>
        <div className="company-info">
            <h2 className='underLine'>About the company</h2>
            <div><span className="summary-titles">IPO Start Date: </span>{detail?.ipo || null}</div>
            <div><span className="summary-titles">Industry: </span>{detail?.finnhubIndustry || null}</div>
            <div><span className="summary-titles">Webpage: </span><a href={detail?.weburl || null}>{detail?.weburl || null}</a></div>
            <div><span className="summary-titles">Company peers: </span></div>
            <div>
            {companyPeers? (companyPeers.map((ticker,index) => (
                <a key={index} href={`/search/${ticker}`} > {ticker+", "} </a>
                ))) 
            : null}
            </div>

        </div>
      </div>
      <div className="chart-section">
        <SummaryLineChart />
      </div>
    </div>
  );
};

export default Summary;
