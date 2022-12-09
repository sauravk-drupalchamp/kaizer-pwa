import { React, Fragment } from "react";
import { Row, Col, Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Avatar } from 'antd';
import {
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = (props) => {
  const auth = useAuth();
  return (
    <Fragment>
      <Row className="header-wrapper">
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          lg={{ 
            span: 4,
            offset: 24,
          }}
          xl={{
            span: 2,
            offset: 4,
          }}
        >
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </Col>
        {props.isLoggedIn && (
          <Col
            xs={{
              span: 22,
              offset: 1,
            }}
            lg={{
              span: 24,
              offset: 0
            }}
            xl={{
              span: 10,
              offset: 0
            }}
          >
            <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
              <Menu.Item key="constructionSites">
                <NavLink to="/">Construction Sites</NavLink>
              </Menu.Item>
              <Menu.Item key="archive">
                <NavLink to="/archive-construction-sites">Archive</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
        )}
        {props.isLoggedIn && (
          <Col
            xs={{
              span: 22,
              offset: 1,
            }}
            lg={{
              span: 2,
              offset: 2 
            }}
            xl={{
              span: 2,
              offset: 2 
            }}
          >
            <Menu mode="horizontal">
              <Menu.SubMenu
                key="Setting"
                icon={ <Avatar shape="square" size={32} icon={<UserOutlined />} />}
              >
                <Menu.Item key="user">
                  <NavLink to="/user">
                    <Button type="secondary" icon={<UserOutlined />} block>
                      My Account
                    </Button>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="logout">
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={auth.logout}
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
