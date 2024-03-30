import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Routes, Route, useParams } from 'react-router-dom';






function SummaryLineChart({dateInsummaryChart}) {
    let { ticker } = useParams();
    const [chartData, setChartData] = React.useState([]);


    React.useEffect(() => {
        console.log(dateInsummaryChart.unixEndDate)
        const fetchData = async () => {
            // if (dateInsummaryChart.unixEndDate != null && dateInsummaryChart.unixStartDate != null) {
                // console.log("aaaaa")
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/companyHistoricalData?stockTicker=${ticker}&multiplier=1&timespan=hour&from=${dateInsummaryChart.unixStartDate}000&to=${dateInsummaryChart.unixEndDate}000`);
                    const data = await response.json();
                    // console.log(response);
                    console.log(data);
                    setChartData(data.map(point => [point.date, point.closePrice]));

                    // Proceed with your logic here
                } catch (error) {
                    console.error("dateInsummaryChart error:", error);
                }
            // }
        };
        if (dateInsummaryChart.unixEndDate != null && dateInsummaryChart.unixStartDate != null) {
            fetchData();
        }

      }, [dateInsummaryChart,ticker]);

    const options = {
        chart: {
            type: 'line'
          },
    
        title: {
            text: ticker.toUpperCase()+ ' Hourly Price Variation',
        },
      
        yAxis: {
            title: {
                text: null
            },
            opposite: true 

        },
      
        xAxis: {
            type: 'datetime', 
        },
      
        legend: {
            enabled: false 
          },
      
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
      
        series: [{
            name: 'Price',
            data: chartData
          }],

      };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default SummaryLineChart;