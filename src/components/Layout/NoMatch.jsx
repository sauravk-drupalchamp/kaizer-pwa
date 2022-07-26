import { React, Fragment } from "react";
import { Row, Col } from "antd";
import { useLocation } from "react-router-dom";
// import CountUp from "react-countup";

const NoMatch = () => {
  const location = useLocation();
// const navigate = useNavigate();
// const timer = ()=>{
//   setInterval(()=>{
//     navigate('/')
//   },4000)
//   return <CountUp 
//   start={5}
//   end={1}
//   duration={4}
// />
// }

  return (
    <Fragment>
      <Row>
        <Col offset={4} span={16} className='no-match-page'>
          <h1>404 Page Not Found..</h1>
          <h2>Wrong URL {location.pathname}</h2>
          {/* <Link to="/">Homepage</Link> */}
          {/* <h2>Redirected to homepage in {timer()} seconds</h2> */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default NoMatch;
