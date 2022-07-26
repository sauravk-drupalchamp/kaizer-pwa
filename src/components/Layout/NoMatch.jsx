import { React, Fragment } from "react";
import { Row, Col } from "antd";
import { useLocation, Link } from "react-router-dom";

const NoMatch = () => {
  const location = useLocation();

  return (
    <Fragment>
      <Row>
        <Col offset={4} span={16} className='no-match-page'>
          <h1>404 Page Not Found..</h1>
          <h2>Wrong URL {location.pathname}</h2>
          <Link to='/'>Homepage</Link>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NoMatch;
