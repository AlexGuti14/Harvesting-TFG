import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import moment from 'moment';
import RangeDatePicker from "../../common/RangeDatePicker";

import PriceGraph from "../../graphs/PriceGraph";
import {getCerealData} from "../../../backend/cereal";
import {parseDate} from "../../../backend/common";


class ArrozGraph extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date()
    this.state = {
      datatype: "cáscara(Indica)",
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
      let all_data = {'Badajoz':[], 'Sevilla': [], 'Tarragona': [], 'Valencia': []};
      let all_dates = [];
      data.forEach((element) => {
        let date = parseDate(element._id);
        let data = element.data;
        const tmp_data = {"Badajoz": null, "Sevilla": null,"Tarragona": null, "Valencia": null};
        if (data.length > 0){
          data.forEach((onedata) =>{
            tmp_data[onedata.market] = onedata.value
          });
          all_data["Badajoz"].push(tmp_data["Badajoz"])
		  all_data["Sevilla"].push(tmp_data["Sevilla"])
		  all_data["Tarragona"].push(tmp_data["Tarragona"])
		  all_data["Valencia"].push(tmp_data["Valencia"])
          all_dates.push(date)
        }
      });
      let base = this.state.chartData;
      base.labels = all_dates;
      base.datasets[0].data = all_data['Badajoz'];
	  base.datasets[1].data = all_data['Sevilla'];
	  base.datasets[2].data = all_data['Tarragona'];
	  base.datasets[3].data = all_data['Valencia'];
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
                value="cáscara(Indica)"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0" + (this.state.datatype === "cáscara(Indica)"? " active": "")}
                onClick={this.changeType}
              >
                Cáscara (Indica)
              </Button>
              <Button
                size="sm"
                value="cáscara(Japónica)"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "cáscara(Japónica)"? " active": "")}
                onClick={this.changeType}
              >
                Cáscara (Japónica)
              </Button>
			  <Button
                size="sm"
                value="blanco(Indica)"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "blanco(Indica)"? " active": "")}
                onClick={this.changeType}
              >
                Blanco (Indica)
              </Button>
			  <Button
                size="sm"
                value="blanco(Japónica)"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "blanco(Japónica)"? " active": "")}
                onClick={this.changeType}
              >
                Blanco (Japónica)
              </Button>
			  <Button
                size="sm"
                value="blancovaporizado"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "blancovaporizado"? " active": "")}
                onClick={this.changeType}
              >
                Blanco vaporizado
              </Button>
			  <Button
                size="sm"
                value="partido"
                className={"d-flex btn-white ml-auto mr-2 ml-sm-auto mt-3 mt-sm-0 "+ (this.state.datatype === "partido"? " active": "")}
                onClick={this.changeType}
              >
                Partido
              </Button>
            </div>

          </div>
          <PriceGraph chartData={this.state.chartData} chartOptions={this.props.chartOptions} />
        </CardBody>
      </Card>
    );
  }
}

ArrozGraph.propTypes = {
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

ArrozGraph.defaultProps = {
  datatype: "cáscara(Indica)",
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
        label: "Badajoz",
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
        "label": "Sevilla",
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
        label: "Tarragona",
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
        label: "Valencia",
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
    ]
  }
};

export default ArrozGraph;
