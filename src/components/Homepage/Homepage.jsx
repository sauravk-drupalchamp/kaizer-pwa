import React from "react";
import axios from "axios";
import { Col, Row, message } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import Config from "../../config";
import bannerImage from "../../assets/homepage-banner.png";
import "./Homepage.css";

const Homepage = (props) => {
  const onFinish = (values) => {
    const userName = values.username;
    const passWord = values.password;

    const error = () => {
      message.error('Invalid Username/Password');
    };

    axios
      .get(`${Config.drupal_live_url}/session/token`)
      .then((res) => {
        // console.log(res.data);

        axios({
          method: "post",
          url: `${Config.drupal_live_url}/user/login?_format=json`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": res.data,
          },
          data: {
            "name": userName,
            "pass": passWord,
          },
        })
          .then((response) => {
            console.log(response);
            const crsf_token = response.data.csrf_token;
            const logout_token = response.data.logout_token;
            // const current_user = response.data.current_user.name;
            const user_id = response.data.current_user.uid;

            // console.log("crsf_token====", crsf_token);
            // console.log("logout_token====", logout_token);
            // console.log("current_user====", current_user);
            // console.log("user_id====", user_id);

            axios.get(`${Config.drupal_live_url}/user/${user_id}?_format=json`).then((roleResponse)=>{
              console.log("roleResponse",roleResponse);
            })

            if(crsf_token && logout_token){
              props.onLogin()
              localStorage.setItem("crsf_token", crsf_token);
              localStorage.setItem("logout_token", logout_token);
            }else{
              error();
            }
            
          })
          .catch((err) => {
            console.log("Error", err);
            error();
          });
      })
      .catch((err) => {
        console.warn(err);
      });

    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12} className="homepage-banner">
        <img src={bannerImage} alt="homepage-banner" />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} className="form-wrapper">
        <h1>Login to account</h1>
        <span>Please enter your email id and password to continue</span>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Homepage;
