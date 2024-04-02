import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const generateData = (data) => {
    const sortedData = data.sort((a, b) => new Date(a.period) - new Date(b.period));


    const categories = sortedData.map(item => `${item.period} Surprise: ${item.surprise}`)
    const actual = sortedData.map(item => item.actual)
    const estimate = sortedData.map(item => item.estimate)
    
    return {
      categories,actual,estimate
    };
};


export default function InsightsInvertedLineChart({companyEarnings}) {
    if(!companyEarnings){
        return;
    }

    const { categories, actual, estimate} = generateData(companyEarnings);


    const options ={
        chart: {
            type: 'spline',

        },
        title: {
            text: 'Historical EPS Surprises',
            align: 'center'
        },
        xAxis: {
            categories:  categories,
            title: {
              text: 'Period'
            }
        },
        yAxis: {
            title: {
                text: 'quarter EPS'
            },

        },
        legend: {
            enabled: false
        },
        tooltip: {

            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: true
                }
            }
        },
        series: [{
            name: 'Actual',
            data: actual
          }, {
            name: 'Estimate',
            data: estimate
          }]



    }
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />

    )
}
