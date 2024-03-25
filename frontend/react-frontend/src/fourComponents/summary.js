import React from 'react'

// export default function Summary() {
//   return (
//     <div>summary</div>
//   )
// }

// import React from 'react';
import './summary.css';
// Import other necessary components and libraries, such as a chart library

function Summary({latestPrice,detail,companyPeers}) {
  // Example data, replace with your actual data fetching logic
  console.log(latestPrice)
//   let stockInfo = {
//     highPrice: null,
//     lowPrice: null,
//     openPrice: null,
//     prevClose: null,
//     ipoDate: null,
//     industry: null,
//     webpage: null,
//     companyPeers: null
//   };

//   if (latestPrice) {
//     stockInfo = {
//     //   ...stockInfo, // Spread the default values
//       highPrice: latestPrice.highPrice , // Use real values or placeholders
//     //   lowPrice: latestPrice.low ,
//     //   openPrice: latestPrice.open ,
//     //   prevClose: latestPrice.close ,

//     };
//   }

  return (
    <div className="stock-details-container">
      <div className="summary-section">
        <div className="price-info">
          <div>High Price: {latestPrice?.highPrice || null}</div>
          <div>Low Price: {latestPrice?.lowPrice || null}</div>
          <div>Open Price: {latestPrice?.openingPrice || null}</div>
          <div>Prev. Close: {latestPrice?.previousClosingPrice || null}</div>
        </div>
        <div className="company-info">
            <h2>About the company</h2>
            <div>IPO Start Date: {detail?.ipo || null}</div>
            <div>Industry: {detail?.finnhubIndustry || null}</div>
            <div>Webpage: <a href={detail?.weburl || null}>{detail?.weburl || null}</a></div>
            <div>Company peers: </div>
            <div> {companyPeers?.join(', ') || null} </div>

        </div>
      </div>
      {/* Assume ChartComponent is a separate component you've created for the chart */}
      <div className="chart-section">
        part2
        {/* Render your ChartComponent here */}
      </div>
    </div>
  );
};

export default Summary;
