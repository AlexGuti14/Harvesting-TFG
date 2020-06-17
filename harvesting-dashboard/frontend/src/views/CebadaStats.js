import React from "react";
import { Container, Row, Col, Button } from "shards-react";
import {Link} from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import CebadaGraph from "../components/layout/overview/CebadaGraph";
import CebadaSumUp from "../components/graphs/CebadaSumUp";



const CebadaStats = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <br></br>
    <Link to={{
		pathname: '/historicCereal',
		state: {
			cereal: 'CEBADA'
		}
	}}>
    <Button className="float-right" size="lg" theme="success" >Histórico de precios</Button>
    </Link>

    <Row noGutters className="page-header py-4">
      <PageTitle title="CEBADA" subtitle="" className="text-sm-left mb-3" />
    </Row>

    <CebadaSumUp/>

    <Row>
      {/* Main Graph */}
      <Col lg="12" md="12" sm="12" className="mb-4">
		<CebadaGraph/>
      </Col>
    </Row>
  </Container>
);

export default CebadaStats;