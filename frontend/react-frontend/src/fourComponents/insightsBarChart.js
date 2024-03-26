import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const processDataForChart = (data) => {
  // Sort data by period
  const sortedData = data.sort((a, b) => new Date(a.period) - new Date(b.period));
  
  // Map through the data to create the series
  const categories = sortedData.map(item => item.period);
  const buy = sortedData.map(item => item.buy);
  const hold = sortedData.map(item => item.hold);
  const sell = sortedData.map(item => item.sell);
  const strongBuy = sortedData.map(item => item.strongBuy);
  const strongSell = sortedData.map(item => item.strongSell);
  
  return {
    categories,
    series: [
      { name: 'Buy', data: buy },
      { name: 'Hold', data: hold },
      { name: 'Sell', data: sell },
      { name: 'Strong Buy', data: strongBuy },
      { name: 'Strong Sell', data: strongSell },
    ]
  };
};

export default function InsightsBarChart({recommendationTrends}) {
  if (!recommendationTrends ) {
    return ;
  }
  const { categories, series } = processDataForChart(recommendationTrends);
  console.log(categories)
  console.log(series)



  const options = {
    chart: {
      type: 'column'
    },
    title: {
        text: 'Recommendation Trends',
        align: 'center'
    },
    // subtitle: {
    //     text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/landtransport/statistikk/innenlandsk-transport">SSB</a>',
    //     align: 'left'
    // },
    xAxis: {
        categories: ['2019', '2020', '2021']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percent'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent',
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%'
            }
        }
    },
    series: [{
        name: 'Strong Buy',
        data: [434, 290, 307]
    }, {
        name: 'Buy',
        data: [272, 153, 156]
    }, {
        name: 'Hold',
        data: [13, 7, 8]
    }, {
        name: 'Sell',
        data: [55, 35, 41]
    }]
    

  };


  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
    )
}
