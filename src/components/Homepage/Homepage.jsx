import React from "react";
import { Col, Row } from "antd";
import { Button, Checkbox, Form, Input } from 'antd';
import bannerImage from '../../assets/homepage-banner.png'
import './Homepage.css'

const Homepage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
    <Col xs={24} sm={24} md={24} lg={12} className='homepage-banner'>
      <img src={bannerImage} alt="homepage-banner" />
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} className='form-wrapper'>
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
            message: 'Please input your username!',
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
            message: 'Please input your password!',
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
