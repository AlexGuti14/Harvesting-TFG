import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import moment from 'moment';
import RangeDatePicker from "../../common/RangeDatePicker";

import PriceGraph from "../../graphs/PriceGraph";
import {getEuropeData} from "../../../backend/historic";
import {parseDate} from "../../../backend/common";


class EuropeGraph extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date()
    this.state = {
      datatype: "S",
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

    getEuropeData(params,(data) => {
	  let all_data = {'Belgium':[], 'Bulgaria': [], 'Czechia': [], 'Denmark': [], 'Germany': [], 'Estonia': [], 'Ireland': [], 'Greece': [],
	  'Spain': [], 'France': [], 'Croatia': [], 'Italy': [], 'Cyprus': [], 'Latvia': [], 'Lihtuania': [], 'Luxembourg': [], 'Hungary': [], 'Malta': [],
	   'Netherlands': [], 'Austria': [], 'Poland': [], 'Portugal': []};
      let all_dates = [];
      data.forEach((element) => {
        let date = parseDate(element._id);
		let data = element.data[0].markets;
		const tmp_data = {'Belgium':null, 'Bulgaria': null, 'Czechia': null, 'Denmark': null, 'Germany': null, 'Estonia': null, 'Ireland': null, 'Greece': null,
		 'Spain': null, 'France': null, 'Croatia': null, 'Italy': null, 'Cyprus': null, 'Latvia': null, 'Lihtuania': null, 'Luxembourg': null, 'Hungary': null,
		 'Malta': null, 'Netherlands': null, 'Austria': null, 'Poland': null, 'Portugal': null};;
        if (data.length > 0){
          data.forEach((onedata) =>{
            tmp_data[onedata.country] = onedata.price
          });
          all_data["Belgium"].push(tmp_data["Belgium"])
          all_data["Bulgaria"].push(tmp_data["Bulgaria"])
          all_data["Czechia"].push(tmp_data["Czechia"])
          all_data["Denmark"].push(tmp_data["Denmark"])
          all_data["Germany"].push(tmp_data["Germany"])
          all_data["Estonia"].push(tmp_data["Estonia"])
		  all_data["Ireland"].push(tmp_data["Ireland"])
		  all_data["Greece"].push(tmp_data["Greece"])
		  all_data["Spain"].push(tmp_data["Spain"])
		  all_data["France"].push(tmp_data["France"])
		  all_data["Croatia"].push(tmp_data["Croatia"])
		  all_data["Italy"].push(tmp_data["Italy"])
		  all_data["Netherlands"].push(tmp_data["Netherlands"])
		  all_data["Austria"].push(tmp_data["Austria"])
		  all_data["Poland"].push(tmp_data["Poland"])
          all_data["Portugal"].push(tmp_data["Portugal"])
          all_dates.push(date)
        }
      });
      let base = this.state.chartData;
      base.labels = all_dates;
      base.datasets[0].data = all_data['Belgium'];
      base.datasets[1].data = all_data['Bulgaria'];
      base.datasets[2].data = all_data['Czechia'];
      base.datasets[3].data = all_data['Denmark'];
      base.datasets[4].data = all_data['Germany'];
      base.datasets[5].data = all_data['Estonia'];
	  base.datasets[6].data = all_data['Ireland'];
	  base.datasets[7].data = all_data['Greece'];
	  base.datasets[8].data = all_data['Spain'];
	  base.datasets[9].data = all_data['France'];
	  base.datasets[10].data = all_data['Croatia'];
	  base.datasets[11].data = all_data['Italy'];
	  base.datasets[12].data = all_data['Netherlands'];
	  base.datasets[13].data = all_data['Austria'];
	  base.datasets[14].data = all_data['Poland'];
      base.datasets[15].data = all_data['Portugal'];
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
                value="S"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0" + (this.state.datatype === "S"? " active": "")}
                onClick={this.changeType}
              >
                Clase S
              </Button>
              <Button
                size="sm"
                value="E"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "E"? " active": "")}
                onClick={this.changeType}
              >
                Clase E
              </Button>
              <Button
                size="sm"
                value="R"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 " + (this.state.datatype === "R"? " active": "")}
                onClick={this.changeType}
              >
                Clase R
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

EuropeGraph.propTypes = {
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

EuropeGraph.defaultProps = {
  datatype: "S",
  title: "Precios Medios en Mercados Representativos Europeos",
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
        label: "Belgium",
        fill: "start",
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
        "label": "Bulgaria",
		"fill": "start",
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
        label: "Czechia",
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
        label: "Denmark",
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
        label: "Germany",
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
        label: "Estonia",
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
        label: "Ireland",
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
        label: "Greece",
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
        label: "Spain",
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
        label: "France",
        fill: "start",
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
        label: "Croatia",
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
        label: "Italy",
        fill: "start",
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
        label: "Netherlands",
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
        label: "Austria",
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
        label: "Poland",
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
        label: "Portugal",
        fill: "start",
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
      }
    ]
  }
};

export default EuropeGraph;
