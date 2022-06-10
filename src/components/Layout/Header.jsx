import { React, Fragment } from "react";
import { Row, Col, Menu } from "antd";
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons'
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {

  return (
    <Fragment>
      <Row className="header-wrapper">
        <Col span={4}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </Col>
        <Col span={20}>
          <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}><a href="/">Home</a></Menu.Item>
            <Menu.SubMenu key="Menu" title="Menu" icon={<AppstoreOutlined />}>
              <Menu.Item key="addToolbox"><a href="/add-toolbox">Add Toolbox</a></Menu.Item>
              <Menu.Item key="constructionSites"><a href="/construction-sites">Construction Sites</a></Menu.Item>
              <Menu.Item key="externalWorker"><a href="/ext-worker">External Worker</a></Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Header;
