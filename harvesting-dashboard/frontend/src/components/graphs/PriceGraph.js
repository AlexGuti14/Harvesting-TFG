import React from "react";
import PropTypes from "prop-types";

import {Line} from 'react-chartjs-2';


class PriceGraph extends React.Component {

  render() {
    return (
          <Line data={this.props.chartData} options={this.props.chartOptions} height={80}/>
    );
  }
}

PriceGraph.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,

  datatype: PropTypes.string
};

PriceGraph.defaultProps = {
  datatype: "Selecto",
  title: "Price Overview",
  chartOptions: {
    layout: {
      padding:{
        left: 10,
        right: 50
      }
    },
    responsive: true,
    legend: {
      position: "top"
    },
    elements: {
      line: {
        // A higher value makes the line look skewed at this ratio.
        tension: 0.3
      },
      point: {
        radius: 20
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {

          }
        }
      ],
      yAxes:[{
        ticks: {
          padding: 10
        }
      }]
    },
    hover: {
      mode: "nearest",
      intersect: false
    },
    tooltips: {
      custom: false,
      mode: "nearest",
      intersect: false
    }
  },
  chartData: {
    labels: [],
    datasets: [
      {
        label: "Zaragoza",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(0,123,255,0.1)",
        "borderColor": "rgba(0,123,255,1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgb(0,123,255)",
        "borderWidth": 1.5,
        "pointRadius": 0,
        "pointHoverRadius": 3
      },
      {
        "label": "Lerida",
        "fill": "start",
        "data": [
          0
        ],
        "backgroundColor": "rgba(255,65,105,0.1)",
        "borderColor": "rgba(255,65,105,1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(255,65,105,1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(255,65,105,1)"
      }
    ]
  }
};

export default PriceGraph;
