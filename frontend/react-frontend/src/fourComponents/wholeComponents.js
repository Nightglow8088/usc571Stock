import React from 'react'
import Summary from './summary';
import TopNews from './topNews';
import Insights from './insights';
import Charts from './charts';

import './wholeComponents.css'




function WholeComponents({ ticker,latestPrice,detail,companyPeers,companyNews,companyInsiderSentiment,recommendationTrends,companyEarnings,companyHistoricalData}) {
    const [activeComponent, setActiveComponent] = React.useState('summary');
    console.log(latestPrice)
    // 渲染对应的组件
    const renderComponent = () => {
      switch (activeComponent) {
        case 'summary':
          return <Summary latestPrice={latestPrice} detail={detail} companyPeers={companyPeers}/>;
        case 'topNews':
              return <TopNews companyNews={companyNews}/>;
        case 'charts':
          return <Charts companyHistoricalData={companyHistoricalData} ticker={ticker}/>;
        case 'insights':
          return <Insights companyInsiderSentiment={companyInsiderSentiment} recommendationTrends={recommendationTrends} companyEarnings={companyEarnings}/>;
        default:
        //   return <SummaryComponent />;
      }
    };
  
    return (
      <div className="dashboard">
        <div className="button-group">
          <button onClick={() => setActiveComponent('summary')}>Summary</button>
          <button onClick={() => setActiveComponent('topNews')}>Top News</button>
          <button onClick={() => setActiveComponent('charts')}>Charts</button>
          <button onClick={() => setActiveComponent('insights')}>Insights</button>
        </div>
        <div className="content">
          {renderComponent()}
        </div>
      </div>
    );
  };
  
  export default WholeComponents;