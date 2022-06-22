import { React, Fragment } from "react";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";
import './AddExternalWorker.css';

const AddExtWorker = () => {
      // FORM SUBMISSION
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Fragment>
      <Row className="add-external-worker-wrapper">
      <Col span={20}><h1 className="worker-heading">Add External Worker</h1></Col>
        <Col span={20} className="middle-color">
        <p className="general-info">General Info</p>
          <Form
            name="addExternalWorker"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/*========================================== FORM ITEM =========================================== */}
            <Form.Item
              label="Name:"
              name="name"
              rules={[
                { required: true, message: "Please Enter Name" },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Company:"
              name="company"
              rules={[
                { required: true, message: "Please Enter Company" },
              ]}
            >
              <Input placeholder="Company" />
            </Form.Item>

            <Form.Item
              label="ID:"
              name="id"
              rules={[
                { required: true, message: "Please Enter ID" },
              ]}
            >
              <Input placeholder="ID" />
            </Form.Item>

            <Form.Item
              label="Days worked at site:"
              name="daysWorkedAtSite"
              rules={[
                { required: true, message: "Please Enter Days worked at site:" },
              ]}
            >
              <Input placeholder="Days worked at site:" />
            </Form.Item>
            
            

            <Form.Item className="button-wrapper"
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button type="primary">+</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
        </Form>
        </Col>
        </Row>
        </Fragment>
  )
}

export default AddExtWorker