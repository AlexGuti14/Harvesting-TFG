import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import moment from 'moment';
import RangeDatePicker from "../../common/RangeDatePicker";

import PriceGraph from "../../graphs/PriceGraph";
import {getCerealData} from "../../../backend/cereal";
import {parseDate} from "../../../backend/common";


class CebadaGraph extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date()
    this.state = {
      datatype: "Pienso",
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

    getCerealData(params,(data) => {
      let all_data = {'Albacete':[], 'Ávila': [], 'CiudadReal': [], 'Burgos': [], 'Guadalajara': [], 'Huesca': [], 'León': [],'Lérida': [],
      'Madrid': [],'Murcia': [],'Navarra': [],'Palencia': [], 'Pontevedra': [], 'Salamanca': [], 'Segovia': [],'Soria': [],'Teruel': [],
      'Valladolid': [],'Zamora': [],'Zaragoza': [],'Cádiz': [],'Córdoba': [],'Sevilla': []};
      let all_dates = [];
      data.forEach((element) => {
        let date = parseDate(element._id);
        let data = element.data;
        const tmp_data =  {'Albacete':null, 'Ávila': null, 'Cáceres': null, 'CiudadReal': null, 'Gerona': null, 'Huesca': null, 'León': null,'Lérida': null,
        'Madrid': null, 'LaCoruña': null, 'Navarra': null, 'Salamanca': null, 'Toledo': null,'Valladolid': null,'Zamora': null,'Zaragoza': null,'Córdoba': null,'Sevilla': null};;
        if (data.length > 0){
          data.forEach((onedata) =>{
            tmp_data[onedata.market] = onedata.value
          });
          all_data["Albacete"].push(tmp_data["Albacete"])
          all_data["Ávila"].push(tmp_data["Ávila"])
          all_data["CiudadReal"].push(tmp_data["CiudadReal"])
          all_data["Burgos"].push(tmp_data["Burgos"])
          all_data["Guadalajara"].push(tmp_data["Guadalajara"])
          all_data["Huesca"].push(tmp_data["Huesca"])
          all_data["León"].push(tmp_data["León"])
          all_data["Lérida"].push(tmp_data["Lérida"])
          all_data["Madrid"].push(tmp_data["Madrid"])
          all_data["Murcia"].push(tmp_data["Murcia"])
          all_data["Navarra"].push(tmp_data["Navarra"])
          all_data["Palencia"].push(tmp_data["Palencia"])
          all_data["Pontevedra"].push(tmp_data["Pontevedra"])
          all_data["Salamanca"].push(tmp_data["Salamanca"])
          all_data["Segovia"].push(tmp_data["Segovia"])
          all_data["Soria"].push(tmp_data["Soria"])
          all_data["Teruel"].push(tmp_data["Teruel"])
          all_data["Valladolid"].push(tmp_data["Valladolid"])
          all_data["Zamora"].push(tmp_data["Zamora"])
          all_data["Zaragoza"].push(tmp_data["Zaragoza"])
          all_data["Cádiz"].push(tmp_data["Cádiz"])
          all_data["Córdoba"].push(tmp_data["Córdoba"])
          all_data["Sevilla"].push(tmp_data["Sevilla"])
          all_dates.push(date)
        }
      });
      let base = this.state.chartData;
      base.labels = all_dates;
      base.datasets[0].data = all_data['Albacete'];
      base.datasets[1].data = all_data['Ávila'];
      base.datasets[2].data = all_data['CiudadReal'];
      base.datasets[3].data = all_data['Burgos'];
      base.datasets[4].data = all_data['Guadalajara'];
      base.datasets[5].data = all_data['Huesca'];
      base.datasets[6].data = all_data['León'];
      base.datasets[7].data = all_data['Lérida'];
      base.datasets[8].data = all_data['Madrid'];
      base.datasets[9].data = all_data['Murcia'];
      base.datasets[10].data = all_data['Navarra'];
      base.datasets[11].data = all_data['Palencia'];
      base.datasets[12].data = all_data['Pontevedra'];
      base.datasets[13].data = all_data['Salamanca'];
      base.datasets[14].data = all_data['Segovia'];
      base.datasets[15].data = all_data['Soria'];
      base.datasets[16].data = all_data['Teruel'];
      base.datasets[17].data = all_data['Valladolid'];
      base.datasets[18].data = all_data['Zamora'];
      base.datasets[19].data = all_data['Zaragoza'];
      base.datasets[20].data = all_data['Cádiz'];
      base.datasets[21].data = all_data['Córdoba'];
      base.datasets[22].data = all_data['Sevilla'];
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
                value="Pienso"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0" + (this.state.datatype === "Pienso"? " active": "")}
                onClick={this.changeType}
              >
                Pienso
              </Button>
              <Button
                size="sm"
                value="Malta"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "Malta"? " active": "")}
                onClick={this.changeType}
              >
                Malta
              </Button>
            </div>

          </div>
          <PriceGraph chartData={this.state.chartData} chartOptions={this.props.chartOptions} />
        </CardBody>
      </Card>
    );
  }
}

CebadaGraph.propTypes = {
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

CebadaGraph.defaultProps = {
  datatype: "Pienso",
  title: "Precios Medios en Mercados Representativos",
  chartOptions: {
    responsive: true,
    title: {
      display: true,
      position: 'left',
      text: 'Euro/Tonelada'
    },
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
        label: "Albacete",
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
        label: "Ávila",
        fill: "start",
        hidden: true,
        data: [
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
        label: "CiudadReal",
        fill: "start",
        hidden: true,
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
        label: "Burgos",
        fill: "start",
        hidden: true,
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
        label: "Guadalajara",
        fill: "start",
        hidden: true,
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
        label: "Huesca",
        fill: "start",
        hidden: true,
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
        label: "León",
        fill: "start",
        hidden: true,
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
        label: "Lérida",
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
        label: "Madrid",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(189, 55, 10, 0.1)",
        "borderColor": "rgba(189, 55, 10, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(189, 55, 10, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(189, 55, 10, 1)"
      },
      {
        label: "Murcia",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(189, 144, 10, 0.1)",
        "borderColor": "rgba(189, 144, 10, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(189, 144, 10, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(189, 144, 10, 1)"
      },
      {
        label: "Navarra",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(162, 189, 10, 0.1)",
        "borderColor": "rgba(162, 189, 10, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(162, 189, 10, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(162, 189, 10, 1)"
      },
      {
        label: "Palencia",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(50, 121, 6, 0.1)",
        "borderColor": "rgba(50, 121, 6, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(50, 121, 6, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(50, 121, 6, 1)"
      },
      {
        label: "Pontevedra",
        fill: "start",
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
      },
      {
        label: "Soria",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(6, 121, 81, 0.1)",
        "borderColor": "rgba(6, 121, 81, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(6, 121, 81, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(6, 121, 81, 1)"
      },
      {
        label: "Tarragona",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(6, 73, 121, 0.1)",
        "borderColor": "rgba(6, 73, 121, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(6, 73, 121, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(6, 73, 121, 1)"
      },
      {
        label: "Valladolid",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(8, 6, 121, 0.1)",
        "borderColor": "rgba(8, 6, 121, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(8, 6, 121, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(8, 6, 121, 1)"
      },
      {
        label: "Zamora",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(91, 6, 121, 0.1)",
        "borderColor": "rgba(91, 6, 121, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(91, 6, 121, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(91, 6, 121, 1)"
      },
      {
        label: "Zaragoza",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(255,0,0,0.1)",
        "borderColor": "rgba(255,0,0,1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgb(243, 8, 22)",
        "borderWidth": 1.5,
        "pointRadius": 0,
        "pointHoverRadius": 3
      },
      {
        label: "Cádiz",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(184, 10, 94, 0.1)",
        "borderColor": "rgba(184, 10, 94, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(184, 10, 94, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(184, 10, 94, 1)"
      },
      {
        label: "Córdoba",
        fill: "start",
        hidden: true,
        data: [
          0
        ],
        "backgroundColor": "rgba(179, 145, 9, 0.1)",
        "borderColor": "rgba(179, 145, 9, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(179, 145, 9, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(179, 145, 9, 1)"
      },
      {
        label: "Sevilla",
        fill: "start",
        data: [
          0
        ],
        "backgroundColor": "rgba(8, 82, 155, 0.1)",
        "borderColor": "rgba(8, 82, 155, 1)",
        "pointBackgroundColor": "#ffffff",
        "pointHoverBackgroundColor": "rgba(8, 82, 155, 1)",
        "borderDash": [3, 3],
        "borderWidth": 1,
        "pointRadius": 0,
        "pointHoverRadius": 2,
        "pointBorderColor": "rgba(8, 82, 155, 1)"
      },
    ]
  }
};

export default CebadaGraph;
