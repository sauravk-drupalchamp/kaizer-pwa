import { React, Fragment } from "react";
import { Row, Col, Menu } from "antd";
import { Avatar } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {

  const handleClick = () =>{
    alert(window.location.pathname);
  }

  return (
    <Fragment>
      <Row className="header-wrapper">
        <Col span={4}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </Col>
        <Col span={16}>
          <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="constructionSites"><a href="/construction-sites">Construction Sites</a></Menu.Item>
            <Menu.SubMenu key="Menu" title="Menu" icon={<AppstoreOutlined />}>
              <Menu.Item key="addToolbox"><a href="/add-toolbox">Add Toolbox</a></Menu.Item>
              <Menu.Item key="externalWorker"><a href="/add-external-worker">External Worker</a></Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col span={4}>
        <Avatar onClick={handleClick} size="large" icon={<UserOutlined />} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Header;
