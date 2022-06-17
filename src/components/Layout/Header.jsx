import { React, Fragment, useContext } from "react";
import { Row, Col, Menu, Button } from "antd";
import { Avatar } from "antd";
import {Link} from 'react-router-dom'
import {
  AppstoreOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = (props) => {

  // const handleLogout = () => {
  //   const logoutToken = window.localStorage.getItem("logout_token");
  //   const crsfToken = window.localStorage.getItem("crsf_token");
  //   // console.log(logoutToken);
  //   // axios.post(`${Config.drupal_live_url}/user/logout?_format=json&token=${logoutToken}`).then((response)=>{
  //   //   console.log(response)
  //   // }).catch((err)=>{
  //   //   console.log(err);
  //   // })

  //   axios
  //     .get(`${Config.drupal_live_url}/session/token`)
  //     .then((res) => {
  //       console.log(res.data)
  //       axios({
  //         method: "post",
  //         url: `${Config.drupal_live_url}/user/logout?_format=json&token=${logoutToken}&csrf_token=${crsfToken}`
  //       })
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((err) => {
  //           console.log(err, "====ERROR");
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("GET ERROR",error)
  //     });
  // };
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
                <Link to="/construction-sites">Construction Sites</Link>
              </Menu.Item>
              <Menu.SubMenu key="Menu" title="Menu" icon={<AppstoreOutlined />}>
                <Menu.Item key="addToolbox">
                  <Link to="/add-toolbox">Add Toolbox</Link>
                </Menu.Item>
                <Menu.Item key="externalWorker">
                  <Link to="/add-external-worker">External Worker</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        )}
        {props.isLoggedIn && (
          <Col span={4}>
            <Link to="/user">
            <Avatar
              size="large"
              icon={<UserOutlined />}
            />
            </Link>
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={props.onLogout}
            />
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default Header;
