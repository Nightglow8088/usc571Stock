import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// Import necessary modules for SMA and VBP
import IndicatorsCore from 'highcharts/indicators/indicators-all';
import VBP from 'highcharts/indicators/volume-by-price';


import './charts.css'


IndicatorsCore(Highcharts);
VBP(Highcharts);

export default function Charts({companyHistoricalData,ticker }) {
    if(!companyHistoricalData || !ticker || ticker=="home"|| typeof ticker==="undefined"){
        return null;
    }
    const tickerUpperCase = ticker.toUpperCase();



    // console.log(companyHistoricalData)


    const candlestickData = companyHistoricalData.map(item => ({
        x: item.date,
        open: item.openPrice,
        high: item.highPrice,
        low: item.lowPrice,
        close: item.closePrice
    }));

    const volumeData = companyHistoricalData.map(item => [item.date, item.volume]);


    const options = {
        chart: {

            height:600,
            width: 900, 
        },
        rangeSelector: {
            selected: 2,
        },
        title: {
            text: tickerUpperCase+' Historical',
        },
        subtitle: {
            text: 'with sma and volume by price technical indicators',
            align: 'center'
        },
        yAxis: [{
            startOnTick: false,
            endOnTick: false,
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        series: [
            {
                id: 'stock', 
                type: 'candlestick',
                name: tickerUpperCase+' Stock Price',
                data: candlestickData,
            },
            {
                id: 'volume',
                type: 'column',
                name: 'Volume',
                data: volumeData,
                yAxis: 1,
            },
            {
                type: 'sma',
                linkedTo: 'stock', 
                zIndex: 1,
            },
            {
                type: 'vbp',
                linkedTo: 'stock', 
                params: {
                    volumeSeriesID: 'volume',
                },
                dataLabels: {
                    enabled: false,
                },
                zoneLines: {
                    enabled: false,
                },
            },
        ],
    };


     


  return (
    <div className= "chart-container">
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
    </div>

  )
}


