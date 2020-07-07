import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import {getCerealData, getCerealMarkets} from "../backend/cereal";

import moment from "moment";

import { MDBDataTable } from 'mdbreact';



class HistoricCereal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      markets: [],
      cereal: ''
    };
  }

  getData(cereal){
    getCerealData({"cereal": cereal},(data) => {
      let all_data = {};
      data.forEach((element) => {
        let date = moment(element._id).format('YYYY-MM-DD');
        let data = element.data;

        if (data.length > 0){
          data.forEach((onedata) =>{
            if (!(onedata.type in all_data)){
              all_data[onedata.type] = {}
            }
            if(!(date in all_data[onedata.type])){
              all_data[onedata.type][date]={};
            }
              all_data[onedata.type][date][onedata.market] = onedata.value

          });
        }
      });
      const final = {};
      for(let key in all_data){
        final[key]= []
        for (let key2 in all_data[key]){
          if (all_data[key].hasOwnProperty(key2))
          final[key].push({"date": key2, ...all_data[key][key2]})
        }
      }
      this.setState({data: final, cereal: cereal})

      getCerealMarkets({"cereal": cereal},(data) => {
        this.setState({markets: data})
      })
  })}

  componentDidMount() {
    this.setState({cereal: this.props.location.state.cereal});
    this.getData(this.props.location.state.cereal);
  }

  createMarkets(){

  }

  render(){
    var market = [];
    market.push(
      {
        label: 'Fecha',
        field: 'date',
        sort: 'asc',
        width: 150
      }
    )
    if(this.state.cereal === "ARROZ"){
      this.state.markets.map((m) =>
        market.push(
          {
            label: m,
            field: m,
            sort: 'asc',
            width: 150
          }
        )
      )
    }
    else{
      this.state.markets.map((m) =>
      market.push(
        {
          label: m.slice(0, 2),
          field: m,
          sort: 'asc',
          width: 150
        }
      )
    )
    }
    
    
    return (<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title={this.state.cereal} subtitle="Histórico de precios" className="text-sm-left" />
        </Row>
        { Object.entries(this.state.data).map(([key, value], index) =>{
          return(
          <Row key={`Row-${index}`}>
          <Col>
            <Card small className="mb-4">
            <CardHeader className="border-bottom">
            <h6 className="m-0">{key}</h6>
            </CardHeader>
          <CardBody className="p-0 pb-3">
            <MDBDataTable className={"m-2"}
              scrollY
              maxHeight="40vh"
              striped
              hover
              paging={false}
              data={{
              columns: market,
              rows: value
            }}
            />
          </CardBody>
          </Card>
          </Col>
          </Row>)
        })}

    </Container>
    )
  }
}


export default HistoricCereal;
