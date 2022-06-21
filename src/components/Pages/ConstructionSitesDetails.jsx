import { React } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import { Row, Col } from "antd";
import Tolboxes from "./Tolboxes";
import Workers from "./Workers";
import './ConstructionSitesDetails.css'

const ConstructionSitesDetails = () => {
  const siteID = useParams();
  return (
    <div className="construction-sites-details-wrapper">
      <Row>
        <Col span={12}>
          <GeneralInfo siteID={siteID.id} />
          <Workers siteID={siteID.id} />
        </Col>
        <Col span={12}>
          <Tolboxes siteID={siteID.id} />
        </Col>
      </Row>
    </div>
  );
};

export default ConstructionSitesDetails;
