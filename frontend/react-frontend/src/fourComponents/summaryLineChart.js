import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Routes, Route, useParams } from 'react-router-dom';






function SummaryLineChart() {
    let { ticker } = useParams();

    const options = {
    
        // title: {
        //   text: 'My chart title'
        // },
        // yAxis: {
        //   title: {
        //     text: 'Values'
        //   }
        // },
        // xAxis: {
        //   categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
        // },
        // series: [{
        //   name: 'Series Name',
        //   data: [1, 3, 2, 4, 3] // Replace this with your actual data
        // }],
        // // Additional options go here
    
        title: {
            text: ticker.toUpperCase()+ ' Hourly Price Variation',
            // align: 'left'
        },
      
        // subtitle: {
        //     text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
        //     align: 'left'
        // },
      
        yAxis: {
            // title: {
            //     text: 'Number of Employees'
            // }
        },
      
        xAxis: {
            accessibility: {
                // rangeDescription: 'Range: 2010 to 2020'
            }
        },
      
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
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
            // name: 'Installation & Developers',
            data: [43934, 48656, 65165, 81827, 112143, 142383,
                171533, 165174, 155157, 161454, 154610],
                type: 'line',
                tooltip: {
                  valueDecimals: 2,
                },
            }],
      
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
      };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default SummaryLineChart;