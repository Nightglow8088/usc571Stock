import React from 'react'
import './insights.css'

export default function Insights({companyInsiderSentiment}) {
    const [aggregated, setAggregated] = React.useState({
      totalMspr: 0,
      totalPositiveMspr: 0,
      totalNegativeMspr: 0
    });

    const aggregateMsprValues = (companyInsiderSentiment) => {
      let totalMspr = 0;
      let totalPositiveMspr = 0;
      let totalNegativeMspr = 0;
  

        for (const entry of companyInsiderSentiment) {
          totalMspr += entry.mspr;
          if (entry.mspr > 0) {
            totalPositiveMspr += entry.mspr;
          } else if (entry.mspr < 0) {
            totalNegativeMspr += entry.mspr;
          }
        }
      
        return {
          totalMspr,
          totalPositiveMspr,
          totalNegativeMspr
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
    {companyInsiderSentiment? (
        // handleAggregate(sentimencompanyInsiderSentimenttData)

            <div className="insider-sentiments-container">
                <div className="insider-sentiments-table">
                    <h2>Insider Sentiments</h2>
                    <table>
                    <tbody>
                        <tr>
                        <td>Apple Inc</td>
                        <td>{aggregated.totalMspr}</td>
                        <td>{aggregated.totalPositiveMspr}</td>
                        </tr>
                        <tr>
                        <td>Total</td>
                        <td>{aggregated.totalMspr}</td>
                        <td>{aggregated.totalPositiveMspr}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className='charts'>

                  <div className="recommendation-trends-chart">
                      <h2>Recommendation Trends</h2>
                      {/* <HighchartsReact highcharts={Highcharts} options={recommendationTrendsOptions} /> */}
                  </div>

                  <div className="eps-surprises-chart">
                      <h2>Historical EPS Surprises</h2>
                      {/* <HighchartsReact highcharts={Highcharts} options={epsSurprisesOptions} /> */}
                  </div>
                </div>
            </div>

    ) : null
    }
    </>
  )
}
