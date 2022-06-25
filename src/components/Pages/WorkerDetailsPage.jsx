import React from "react";
import WorkerInfo from "./Worker/WorkerInfo";
import WorkersToolbox from "./Worker/WorkersToolbox";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";

const WorkerDetailsPage = () => {
  const siteID = useParams();
  return (
    <Row>
      <Col span={16} offset={4}>
        <WorkerInfo siteID={siteID.id} />
        <WorkersToolbox siteID={siteID.id} />
      </Col>
    </Row>
  );
};

export default WorkerDetailsPage;
