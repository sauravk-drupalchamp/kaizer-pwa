import { React, Fragment } from "react";
import { Col, Row } from "antd";
import { Button, DatePicker, Form, Input, Upload, Select, message } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "./AddToolbox.css";

const AddToolbox = () => {
  const dateFormat = "YYYY/MM/DD";
  // FILE UPLOAD
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
  
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
  
      return isPNG || Upload.LIST_IGNORE;
    },onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // LANGUAGE
  const { Option } = Select;

  // FORM SUBMISSION
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Row className="add-toolbox-wrapper">
        <Col>
          <Form
            name="addToolbox"
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
              label="Administration Name"
              name="administrationName"
              tooltip={{
                title: "Please Enter Administration Name",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                { required: true, message: "Please Enter Administration Name" },
              ]}
            >
              <Input placeholder="Administration Name" />
            </Form.Item>

            <Form.Item label="Date from:" name="dateFrom">
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item label="Date untill:" name="dateUntill">
              <DatePicker format={dateFormat} />
            </Form.Item>
            {/* -----------------------------------------UPLOAD--------------------------------------- */}
            <Form.Item label="Files:">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload png only</Button>
            </Upload>
            </Form.Item>
            {/*------------------------------------- LANGUAGE -------------------------------------*/}
            <Form.Item name="language" label="Language">
            <Select
              showSearch
              style={{
                width: 200,
              }}
              placeholder="N/L"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="1">Not Identified</Option>
              <Option value="2">English</Option>
              <Option value="3">Hindi</Option>
              <Option value="4">Spanish</Option>
              <Option value="5">German</Option>
            </Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddToolbox;
