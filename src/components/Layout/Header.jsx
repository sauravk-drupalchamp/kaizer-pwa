import {React, Fragment} from 'react';
import {Row, Col} from 'antd';
import './Header.css';
import logo from '../../assets/logo.png';


const Header = () => {
  return (
    <Fragment>
    <Row className='header-wrapper'>
      <Col span={4}>
      <a href="/"><img src={logo} alt="logo" /></a>
      </Col>
      <Col span={20}>
      </Col>
    </Row>
    
    </Fragment>
  )
}

export default Header;