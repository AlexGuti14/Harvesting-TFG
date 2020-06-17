import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {Card, CardBody} from "shards-react";
import {Line} from 'react-chartjs-2';



class SmallStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chartOptions: this.props.chartOptions}

  }
  componentDidMount() {

    let  max = 0;

    this.props.chartData.datasets.forEach((value) =>{
      max = Math.max(max, ...value.data)
    });

    this.setState({chartOptions: {
    ...{
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10
        },
      },
        maintainAspectRatio: true,
          responsive: true,
      legend: {
          display: true,
         position: "bottom",
        },
        hover: {
          mode: "nearest",
            intersect: false
        },

        tooltips: {
          custom: false,
            mode: "nearest",
            intersect: false
        },
        elements: {
          point: {
            radius: 2
          },
          line: {
            tension: 0.33
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: true,
              ticks: {
                display: false
              }
            }
          ],
            yAxes: [
            {
              gridLines: {
      display: true ,
        color: "rgba(102,102,102,0.48)"
    },
              ticks: {
                display: true,
                isplay: true,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: max,
                  padding: 10
              }
            }
          ]
        }
      }
    }
  })
  }


  render() {
    const { chartData, variation, label, values} = this.props;

    const cardClasses = classNames(
      "stats-small mb-3 mt-4",
      variation && `stats-small--${variation}`
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const dataFieldClasses = classNames(
      "stats-small__data",
      "d-flex",
      variation === "1" && "text-center",
      variation === "2" && "text-left"
    );

    const labelClasses = classNames(
      "stats-small__label",
      "text-uppercase",
      "mb-2",
      "ml-5",
      "d-flex justify-content-left",
      variation !== "1" && "mb-1"
    );

    //console.log("small stat", chartData)
    return (
      <Card small className={cardClasses}>
        <span className={labelClasses}>{label}</span>
        <CardBody className={cardBodyClasses}>
          <Line data={chartData} options={this.state.chartOptions} height={"60%"}/>
          <div className={dataFieldClasses}>
            {
              Object.keys(values).map((key, index) => {
                        //console.log("Keys ",  values[key])
                         return(<div className={labelClasses} key={`div-${index}`}>
                            {key}: {values[key] ? values[key].join(", ") : ""}
                          </div>)
                  }
              )}
          </div>
        </CardBody>
      </Card>
    );
  }
}

SmallStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array
};

SmallStats.defaultProps = {
  increase: true,
  values: 0,
  label: "Label",
  chartOptions: {
    ...{
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: true,
        position: "bottom"
      },
      hover: {
        mode: "nearest",
        intersect: false
      },
      tooltips: {
        custom: false,
        mode: "nearest",
        intersect: false
      },
      elements: {
        point: {
          radius: 2
        },
        line: {
          tension: 0.33
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: true,
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: true,

            ticks: {
              display: true,
              isplay: true,
              // Avoid getting the graph line cut of at the top of the canvas.
              // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
              //suggestedMax: Math.max(...this.props.chartData[0].data, ...this.props.chartData[1].data )*1.15
            }
          }
        ]
      }
    }
  },
  chartData: [],
  chartLabels: []
};

export default SmallStats;
