import React from "react";
import { Col, Row } from "antd";
import 'antd/dist/antd.less';

const Homepage = () => {
  return (
    <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col 1
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
      Col 2
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col 3
    </Col>
  </Row>
  );
};

export default Homepage;
