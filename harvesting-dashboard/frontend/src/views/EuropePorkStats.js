import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import EuropeGraph from "../components/layout/overview/EuropeGraph";

const EuropePorkStats = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="PORCINO" subtitle="Precios de mercado semanales de la UE para la canal de cerdo" className="text-sm-left mb-3" />
    </Row>


    {/* Small Stats Blocks */}
    <h5>Europa</h5>

    <Row>
      {/* Main Graph */}
      <Col lg="12" md="12" sm="12" className="mb-4">
        <EuropeGraph/>
      </Col>
    </Row>
  </Container>
);


export default EuropePorkStats;
