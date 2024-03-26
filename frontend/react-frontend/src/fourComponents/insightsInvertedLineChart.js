import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function InsightsInvertedLineChart({companyEarnings}) {
    if(!companyEarnings){
        return;
    }
    const options ={
        chart: {
            type: 'spline',
            // inverted: true
        },
        title: {
            text: 'Historical EPS Surprises',
            align: 'center'
        },
        // subtitle: {
        //     text: 'According to the Standard Atmosphere Model',
        //     align: 'left'
        // },
        xAxis: {
            categories:  companyEarnings.map(item => `${item.period} Surprise: ${item.surprise}`),
            title: {
              text: 'Period'
            }
            // reversed: false,
            // title: {
            //     enabled: true,
            //     text: 'Altitude'
            // },
            // labels: {
            //     format: '{value} km'
            // },
            // accessibility: {
            //     rangeDescription: 'Range: 0 to 80 km.'
            // },
            // maxPadding: 0.05,
            // showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'quarter EPS'
            },
            // labels: {
            //     format: '{value}°'
            // },
            // accessibility: {
            //     rangeDescription: 'Range: -90°C to 20°C.'
            // },
            // lineWidth: 2
        },
        legend: {
            enabled: false
        },
        tooltip: {
            // headerFormat: '<b>{series.name}</b><br/>',
            // pointFormat: '{point.x} km: {point.y}°C'
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
            data: companyEarnings.map(item => item.actual)
          }, {
            name: 'Estimate',
            data: companyEarnings.map(item => item.estimate)
          }]
        // series: [{
        //     name: 'Temperature',
        //     data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
        //         [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    
        // }]


    }
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />

    )
}
