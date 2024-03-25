import React from 'react'
import Summary from './summary';
import './wholeComponents.css'


function WholeComponents({ ticker,latestPrice,detail,companyPeers}) {
    const [activeComponent, setActiveComponent] = React.useState('summary');
    console.log(latestPrice)
    // 渲染对应的组件
    const renderComponent = () => {
      switch (activeComponent) {
        case 'summary':
          return <Summary latestPrice={latestPrice} detail={detail} companyPeers={companyPeers}/>;
        case 'charts':
        //   return <ChartsComponent />;
        case 'news':
        //   return <TopNewsComponent />;
        case 'insights':
        //   return <InsightsComponent />;
        default:
        //   return <SummaryComponent />;
      }
    };
  
    return (
      <div className="dashboard">
        <div className="button-group">
          <button onClick={() => setActiveComponent('summary')}>Summary</button>
          <button onClick={() => setActiveComponent('charts')}>Charts</button>
          <button onClick={() => setActiveComponent('news')}>Top News</button>
          <button onClick={() => setActiveComponent('insights')}>Insights</button>
        </div>
        <div className="content">
          {renderComponent()}
        </div>
      </div>
    );
  };
  
  export default WholeComponents;