import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import {getHistoryData} from "../backend/historic";
import moment from "moment";
import { MDBDataTable } from 'mdbreact';



class HistoricPork extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  getData(){
    getHistoryData({},(data) => {
      let all_data = {};
      console.log(data[0]);
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
      this.setState({data: final})
    })}

  componentDidMount() {
    this.getData()

  }

  render(){




    //console.log("STATE", this.state);
    return (<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="PORCINO" subtitle="Histórico de precios" className="text-sm-left" />
        </Row>
        { Object.entries(this.state.data).map(([key, value], index) =>{
          //console.log("+++", this.state.data[key])
          if(key === 'Selecto' || key === 'Normal' || key === 'Graso' ){
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
                columns: [
                  {
                  label: 'Fecha',
                  field: 'date',
                  sort: 'asc',
                  width: 250
                  },
                  {
                    label: 'Binefar',
                    field: 'Binefar',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Lerida',
                    field: 'Lerida',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Huesca',
                    field: 'Huesca',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Murcia',
                    field: 'Murcia',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Pontevedra',
                    field: 'Pontevedra',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Salamanca',
                    field: 'Salamanca',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Segovia',
                    field: 'Segovia',
                    sort: 'asc',
                    width: 200
                  }
                ],
                rows: value
                }}
                />
              </CardBody>
              </Card>
              </Col>
              </Row>)
            }
            
        })}

    </Container>
    )
  }
}


export default HistoricPork;
