import React from "react";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import {Link} from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import PorkGraph from "../components/layout/overview/PorkGraph";
import SumUp from "../components/graphs/SumUp"; //TODO Rename to MainGraph
//import HistoricPork from "./HistoricPork"

const PorkStats = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <br></br>
    <ButtonGroup className="float-right">
    <Link to="/europePork">
    <Button  size="lg" >Europa</Button>
    </Link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/historicPork">
    <Button size="lg" theme="success" >Histórico de precios</Button>
    </Link>
    </ButtonGroup>

    <Row noGutters className="page-header py-4">
      <PageTitle title="PORCINO" subtitle="" className="text-sm-left mb-3" />
    </Row>


    {/* Small Stats Blocks */}
    <SumUp/>

    <Row>
      {/* Main Graph */}
      <Col lg="12" md="12" sm="12" className="mb-4">
        <PorkGraph/>
      </Col>
    </Row>
  </Container>
);


export default PorkStats;
