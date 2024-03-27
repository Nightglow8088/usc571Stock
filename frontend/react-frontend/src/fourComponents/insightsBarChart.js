import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const generateData = (data) => {

  const sortedData = data.sort((a, b) => new Date(a.period) - new Date(b.period));
  
  const categories = sortedData.map(item => item.period);
  const buy = sortedData.map(item => item.buy);
  const hold = sortedData.map(item => item.hold);
  const sell = sortedData.map(item => item.sell);
  const strongBuy = sortedData.map(item => item.strongBuy);
  const strongSell = sortedData.map(item => item.strongSell);
  
  return {
    categories,
    series: [
      { name: 'Strong Buy', data: strongBuy },
      { name: 'Buy', data: buy },
      { name: 'Hold', data: hold },
      { name: 'Sell', data: sell },
      { name: 'Strong Sell', data: strongSell },
    ]
  };
};

export default function InsightsBarChart({recommendationTrends}) {
  if (!recommendationTrends ) {
    return ;
  }
  const { categories, series } = generateData(recommendationTrends);
  // console.log(categories)
  // console.log(series)



  const options = {
    chart: {
      type: 'column'
    },
    title: {
        text: 'Recommendation Trends',
        align: 'center'
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
        min: 0,
        title: {
            text: '#analysis'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
            }
        }
    },
    series

    
  };


  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
    )
}
