import { React } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./ConstructionSite/GeneralInfo";
import { Row, Col } from "antd";
import Tolboxes from "./ConstructionSite/Tolboxes";
import Workers from "./ConstructionSite/Workers";
import './ConstructionSites.css'

const ConstructionSitesDetails = () => {
  const siteID = useParams();
  return (
    <div className="construction-sites-details-wrapper">
      <Row>
        <Col span={8} offset={4} className="general-info-ipad">
          <GeneralInfo siteID={siteID.id} />
          <Workers siteID={siteID.id} />
        </Col>
        <Col span={8} className="general-info-ipad">
          <Tolboxes siteID={siteID.id} />
        </Col>
      </Row>
    </div>
  );
};

export default ConstructionSitesDetails;
