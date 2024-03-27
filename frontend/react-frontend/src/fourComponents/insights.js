import React from 'react'
import InsightsBarChart from './insightsBarChart';
import InsightsInvertedLineChart from './insightsInvertedLineChart';
import './insights.css'

export default function Insights({companyInsiderSentiment, recommendationTrends,companyEarnings, name}) {

    const [aggregated, setAggregated] = React.useState({
      totalMspr: 0,
      positiveMspr: 0,
      negativeMspr: 0,
      totalChange: 0,
      positiveChange: 0,
      negativeChange: 0
    });

    const aggregateMsprValues = (companyInsiderSentiment) => {
      let totalMspr = 0;
      let positiveMspr = 0;
      let negativeMspr = 0;
      let totalChange = 0;
      let positiveChange = 0;
      let negativeChange = 0;
  

        for (const entry of companyInsiderSentiment) {
          totalMspr+= entry.mspr;
          totalChange+=entry.change;
          if (entry.mspr > 0) {
            positiveMspr += entry.mspr;
          } 
          else if (entry.mspr < 0) {
            negativeMspr += entry.mspr;
          }

          if (entry.change > 0) {
            positiveChange += entry.change;
          } 
          else if (entry.change < 0) {
            negativeChange += entry.change;
          }

        }
      
        return {
          totalMspr,
          positiveMspr,
          negativeMspr,
          totalChange,
          positiveChange,
          negativeChange
        };
    };

    React.useEffect(() => {
        if (companyInsiderSentiment) {
          const aggregatedValues = aggregateMsprValues(companyInsiderSentiment.data);
          setAggregated(aggregatedValues);
        }
      }, [companyInsiderSentiment]);

  return (
    <>
    {(companyInsiderSentiment && name)? (

      <div className="container">
        <div className="insiderSentiments">
          <h2>Insider Sentiments</h2>

          <table>
            <thead>
              <tr>
                <th> {name}</th>
                <th> MSFR </th>
                <th> Change </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Total</b></td>
                <td>{aggregated.totalMspr.toFixed(2)}</td>
                <td>{aggregated.totalChange}</td>
              </tr>
              <tr>
                <td><b>Positive</b></td>
                <td>{aggregated.positiveMspr.toFixed(2)}</td>
                <td>{aggregated.positiveChange}</td>
              </tr>
              <tr>
                <td><b>Negative</b></td>
                <td>{aggregated.negativeMspr.toFixed(2)}</td>
                <td>{aggregated.negativeChange}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='recommendationCharts'>
          <div className="recommendation-trends-chart">
              <InsightsBarChart recommendationTrends={recommendationTrends}/>
          </div>

          <div className="eps-surprises-chart">
            <InsightsInvertedLineChart companyEarnings={companyEarnings}/>

          </div>
      </div>
      </div>
          

    ) : null
    }
    </>
  )
}
