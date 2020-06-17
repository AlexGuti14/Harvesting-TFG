import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import moment from 'moment';
import RangeDatePicker from "../../common/RangeDatePicker";

import PriceGraph from "../../graphs/PriceGraph";
import {getHistoryData} from "../../../backend/historic";
import {parseDate} from "../../../backend/common";


class PorkGraph extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date()
    this.state = {
      datatype: "Selecto",
      chartData: this.props.chartData,
      startDate: today.setFullYear(today.getFullYear()-2),
      endDate: undefined
    };
    this.changeType = this.changeType.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData(){
    const params = {type: this.state.datatype}
    if (this.state.startDate != null){
      params.from = moment.utc(this.state.startDate).format("DD-MM-YYYY")
    }
    if (this.state.endDate != null){
      params.to = moment.utc(this.state.endDate).format("DD-MM-YYYY")
    }

    getHistoryData(params,(data) => {
      let all_data = {'Lerida':[], 'Binefar': [], 'Barcelona': [], 'Huesca': [], 'Murcia': [], 'Pontevedra': [], 'Salamanca': [], 'Segovia': []};
      let all_dates = [];
      data.forEach((element) => {
        let date = parseDate(element._id);
        let data = element.data;
        const tmp_data = {'Lerida':null, 'Binefar': null, 'Barcelona': null, 'Huesca': null, 'Murcia': null, 'Pontevedra': null, 'Salamanca': null, 'Segovia': null};;
        if (data.length > 0){
          data.forEach((onedata) =>{
            tmp_data[onedata.market] = onedata.value
          });
          all_data["Lerida"].push(tmp_data["Lerida"])
          all_data["Binefar"].push(tmp_data["Binefar"])
          all_data["Barcelona"].push(tmp_data["Barcelona"])
          all_data["Huesca"].push(tmp_data["Huesca"])
          all_data["Murcia"].push(tmp_data["Murcia"])
          all_data["Pontevedra"].push(tmp_data["Pontevedra"])
          all_data["Salamanca"].push(tmp_data["Salamanca"])
          all_data["Segovia"].push(tmp_data["Segovia"])
          all_dates.push(date)
        }
      });
      let base = this.state.chartData;
      base.labels = all_dates;
      base.datasets[0].data = all_data['Binefar'];
      base.datasets[1].data = all_data['Lerida'];
      base.datasets[2].data = all_data['Barcelona'];
      base.datasets[3].data = all_data['Huesca'];
      base.datasets[4].data = all_data['Murcia'];
      base.datasets[5].data = all_data['Pontevedra'];
      base.datasets[6].data = all_data['Salamanca'];
      base.datasets[7].data = all_data['Segovia'];
      this.setState({
        datatype: this.state.datatype,
        chartData: base
      });
      //console.log(this.state.chartData)
    })};


  changeType(event) {
    //console.log("change_type");
    this.setState({
      datatype: event.currentTarget.value
    }, () => {
      this.getData()
    })
  }

    handleStartDateChange(value){
      this.setState({startDate: new Date(value)},()=>{
        this.getData()
      })

    }
    handleEndDateChange(value){
      this.setState({endDate: new Date(value)},()=>{
        this.getData()
      })
    }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-10">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="border-bottom py-2 bg-light d-flex flex-row">
            <div sm="7" className="d-flex mb-2 mb-sm-0 mr-auto">
              <RangeDatePicker startDate={this.state.startDate} endDate={this.state.endDate} handleEndDateChange={this.handleEndDateChange} handleStartDateChange={this.handleStartDateChange}/>
            </div>
            <div className="d-flex flex-row">
              <Button
                size="sm"
                value="Selecto"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0" + (this.state.datatype === "Selecto"? " active": "")}
                onClick={this.changeType}
              >
                Selecto
              </Button>
              <Button
                size="sm"
                value="Normal"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "Normal"? " active": "")}
                onClick={this.changeType}
              >
                Normal
              </Button>
              <Button
                size="sm"
                value="Graso"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 " + (this.state.datatype === "Graso"? " active": "")}
                onClick={this.changeType}
              >
                Graso
              </Button>
              <Button
                  size="sm"
                  value="Lechon"
                  className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 " + (this.state.datatype === "Lechon"? " active": "")}
                  onClick={this.changeType}
              >
                Lechon
              </Button>
            </div>

          </div>
          <PriceGraph chartData={this.state.chartData} chartOptions={this.props.chartOptions} />
        </CardBody>
      </Card>
    );
  }
}

PorkGraph.propTypes = {
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

PorkGraph.defaultProps = {
  datatype: "Selecto",
  title: "Precios Medios en Mercados Representativos Españoles",
  chartOptions: {
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
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {

          ticks: {
            padding: 15,
            autoskip: true,
            maxTicksLimit: 30
            //callback(tick, index) {
              // Jump every 7 values on the X axis labels to avoid clutter.
            //  return index % 4 !== 0 ? null : tick;
           // }
          }
        }
      ],

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
        label: "Binefar",
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
      },
      {
        label: "Barcelona",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(234, 218, 77, 0.1)",
        "borderColor": "rgba(234, 218, 77, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(234, 218, 77, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(234, 218, 77, 1)"
      },
      {
        label: "Huesca",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(137, 234, 77, 0.1)",
        "borderColor": "rgba(92, 201, 24, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(92, 201, 24, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(92, 201, 24, 1)"
      },
      {
        label: "Murcia",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(201, 100, 24, 0.1)",
        "borderColor": "rgba(201, 100, 24, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(201, 100, 24, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(201, 100, 24, 1)"
      },
      {
        label: "Pontevedra",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(151, 24, 201, 0.1)",
        "borderColor": "rgba(151, 24, 201, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(151, 24, 201, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(151, 24, 201, 1)"
      },
      {
        label: "Salamanca",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(0, 229, 255, 0.1)",
        "borderColor": "rgba(0, 229, 255, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(0, 229, 255, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(0, 229, 255, 1)"
      },
      {
        label: "Segovia",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(255, 0, 170, 0.1)",
        "borderColor": "rgba(255, 0, 170, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(255, 0, 170, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(255, 0, 170, 1)"
      }
    ]
  }
};

export default PorkGraph;
