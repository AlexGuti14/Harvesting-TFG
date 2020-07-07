import SmallStats from "../common/SmallStats";
import React from "react";
import {Col, Row,Container} from "shards-react";
import PropTypes from "prop-types";
import moment from "moment";
import {getHistoryData} from "../../backend/historic";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "shards-react";

class SumUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      smallStats: this.props.smallStats,
      open: false,
	    market: 'Binefar'
    };
    this.toggle = this.toggle.bind(this);
	  this.click = this.click.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }


  getData(type,market, callback){
    getHistoryData({"limit": 4, "type": type, "market": market}, (data)=>{
      //console.log("### Done", type,  data);
      if (data.length === 0){
        callback([0,0,0,0])
      }else{
        const aggregateData = data.map((item) => {
          return item.data[0].value
        });
        const aggregatedDates = data.map((item) =>{
          return moment(item._id).format('DD-MM-YYYY');
        });

        callback(aggregateData, aggregatedDates)
    }}
      )
  }

  click(name){
    let SmallStats = this.state.smallStats;
    SmallStats.forEach((stats)=> {
		const type = stats.label;
		this.setState({market: name});
        this.getData(type, name, (aggegatedata, aggregatedDates) =>{
          stats.chartData.datasets[0].data = aggegatedata;
          stats.chartData.labels = aggregatedDates;
          //console.log("### Data", aggegatedata, aggregatedDates);
          let percentage = ((aggegatedata[aggegatedata.length - 1] - aggegatedata[aggegatedata.length - 2])/aggegatedata[aggegatedata.length - 1]*100);
          stats.increase = percentage >= 0;
          stats.decrease = percentage < 0;
          stats.percentage = percentage.toFixed(2)+ "%";
          stats.value = aggegatedata[aggegatedata.length - 1];
          this.setState({smallStats: SmallStats}, () => {
            //console.log("###State ", this.state.smallStats)
          })
        })
	})
}


  componentDidMount() {

    let SmallStats = this.state.smallStats;
    SmallStats.forEach((stats)=> {
        const type = stats.label;
        this.getData(type, "Binefar", (aggegatedata, aggregatedDates) =>{
          stats.chartData.datasets[0].data = aggegatedata;
          stats.chartData.labels = aggregatedDates;
          //console.log("### Data", aggegatedata, aggregatedDates);
          let percentage = ((aggegatedata[aggegatedata.length - 1] - aggegatedata[aggegatedata.length - 2])/aggegatedata[aggegatedata.length - 1]*100);
          stats.increase = percentage >= 0;
          stats.decrease = percentage < 0;
          stats.percentage = percentage.toFixed(2)+ "%";
          stats.value = aggegatedata[aggegatedata.length - 1];
          this.setState({smallStats: SmallStats}, () => {
            //console.log("###State ", this.state.smallStats)
          })
        })

    })

  }

  render() {
    return (
      <Container>
		<Row>
		<Dropdown open={this.state.open} toggle={this.toggle}>
			<DropdownToggle>{this.state.market}</DropdownToggle>
			<DropdownMenu>
      <DropdownItem onClick={() => this.click("Binefar")}>Binefar</DropdownItem>
			<DropdownItem  onClick={() => this.click("Barcelona")} >Barcelona</DropdownItem>
			<DropdownItem onClick={() => this.click("Segovia")}>Segovia</DropdownItem>
      <DropdownItem onClick={() => this.click("Lerida")}>Lerida</DropdownItem>
      <DropdownItem onClick={() => this.click("Huesca")}>Huesca</DropdownItem>
      <DropdownItem onClick={() => this.click("Murcia")}>Murcia</DropdownItem>
      <DropdownItem onClick={() => this.click("Pontevedra")}>Pontevedra</DropdownItem>
      <DropdownItem onClick={() => this.click("Salamanca")}>Salamanca</DropdownItem>

	  </DropdownMenu>
	</Dropdown>
	</Row>
	<br></br>
      <Row>
        {this.state.smallStats.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.chartData}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        ))}
      </Row>
      </Container>
    )
  };
}

  SumUp.propTypes = {
    /**
     * Whether to hide the logo text, or not.
     */
    hideLogoText: PropTypes.bool
  };
  SumUp.defaultProps = {
  smallStats: [
    {
      label: "Selecto",
      value: "1.06", //Set the latest value!
      percentage: "0%", //Increase or decrease %
      increase: true, //If increase
      decrease: false, //If decrease, opposite to increase
      chartLabels: [null, null, null, null], // [null]*n_data
      attrs: { md: "6", sm: "6" },
      chartData: {
        datasets: [{
          label: "Price",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [0,0,0,0]
        }],
        labels: [null, null, null, null]
      }
    },
    {
      label: "Normal",
      value: "1.04",
      percentage: "0%",
      increase: true,
      attrs: { md: "6", sm: "6" },
      chartData:
        {
          datasets: [
            {
            label: "Price",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [0,0,0,0]
          }],
          labels: [null, null, null, null]
        }
    },
    {
      label: "Graso",
      value: "1.02",
      percentage: "0%",
      increase: true,
      decrease: false,
      attrs: { md: "4", sm: "6" },
      chartData:
        {
          datasets: [{
            label: "Price",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [0, 0, 0, 0]
          }],
          labels: [null, null, null, null]
        }
    },
    {
      label: "Lechon",
      value: "38.00",
      percentage: "8.57%",
      increase: true,
      decrease: false,
      attrs: { md: "4", sm: "6" },
      chartData:
        {
        datasets: [{
          label: "Price",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [0,0,0,0]
        }],
        labels: [null, null, null, null]
        }
    }
  ]
};
export default SumUp;
