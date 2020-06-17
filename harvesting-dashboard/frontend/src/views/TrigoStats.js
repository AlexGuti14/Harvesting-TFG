import React from "react";
import { Container, Row, Col, Button } from "shards-react";
import {Link} from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import TrigoGraph from "../components/layout/overview/TrigoGraph";
import TrigoSumUp from "../components/graphs/TrigoSumUp";




const TrigoStats = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <br></br>
    <Link to={{
		pathname: '/historicCereal',
		state: {
			cereal: 'TRIGO'
		}
	}}>
    <Button className="float-right" size="lg" theme="success" >Histórico de precios</Button>
    </Link>
    <Row noGutters className="page-header py-4">
      <PageTitle title="TRIGO" subtitle="" className="text-sm-left mb-3" />
    </Row>

    <TrigoSumUp/>

    <Row>
      {/* Main Graph */}
      <Col lg="12" md="12" sm="12" className="mb-4">
        <TrigoGraph/>
      </Col>
    </Row>
  </Container>
);

export default TrigoStats;