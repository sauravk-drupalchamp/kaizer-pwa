import { React, Fragment } from "react";
import { Row, Col, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = (props) => {
  return (
    <Fragment>
      <Row className="header-wrapper">
        <Col span={4}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        {props.isLoggedIn && (
          <Col span={16}>
            <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
              <Menu.Item key="constructionSites">
                <Link to="/">Construction Sites</Link>
              </Menu.Item>
              <Menu.Item disabled="true" key="archive">
                Archive
              </Menu.Item>
            </Menu>
          </Col>
        )}
        {props.isLoggedIn && (
          <Col span={4}>
            <Menu mode="horizontal">
              <Menu.SubMenu key="Setting" title="Menu" icon={<SettingOutlined  />}>
                <Menu.Item key="user">
                  <Link to="/user">
                    <Button
                    type="secondary"
                    icon={<UserOutlined />}
                    block
                  >
                    User
                  </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={props.onLogout}
                    block
                  >
                    Logout
                  </Button>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default Header;
