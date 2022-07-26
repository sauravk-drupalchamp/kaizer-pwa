import { React, Fragment } from "react";
import { Row, Col, Button } from "antd";
import { useLocation, Link, useNavigate } from "react-router-dom";

const NoMatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Fragment>
      <Row>
        <Col offset={4} span={16} className='no-match-page'>
          <h1>404 Page Not Found..</h1>
          <h2>Wrong URL {location.pathname}</h2>
          <Link to='/'><Button type="primary">Homepage</Button></Link>
          <Button type="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NoMatch;
