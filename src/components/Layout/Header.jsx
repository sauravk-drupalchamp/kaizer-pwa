import { React, Fragment } from "react";
import { Row, Col, Menu, Button } from "antd";
import { Avatar } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import axios from "axios";
import Config from "../../config";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  const handleClick = () => {
    alert(window.location.pathname);
  };

  const handleLogout = () => {
    const logoutToken = window.localStorage.getItem("logout_token");
    const crsfToken = window.localStorage.getItem("crsf_token");
    // console.log(logoutToken);
    // axios.post(`${Config.drupal_live_url}/user/logout?_format=json&token=${logoutToken}`).then((response)=>{
    //   console.log(response)
    // }).catch((err)=>{
    //   console.log(err);
    // })

    axios({
      method: "post",
      url: `${Config.drupal_live_url}/user/logout?_format=json&token=${logoutToken}`,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": crsfToken,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <Row className="header-wrapper">
        <Col span={4}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </Col>
        <ProtectedRoute>
          <Col span={16}>
            <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
              <Menu.Item key="constructionSites">
                <a href="/construction-sites">Construction Sites</a>
              </Menu.Item>
              <Menu.SubMenu key="Menu" title="Menu" icon={<AppstoreOutlined />}>
                <Menu.Item key="addToolbox">
                  <a href="/add-toolbox">Add Toolbox</a>
                </Menu.Item>
                <Menu.Item key="externalWorker">
                  <a href="/add-external-worker">External Worker</a>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
          <Col span={4}>
            <Avatar
              onClick={handleClick}
              size="large"
              icon={<UserOutlined />}
            />
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={handleLogout}
            />
          </Col>
        </ProtectedRoute>
      </Row>
    </Fragment>
  );
};

export default Header;
