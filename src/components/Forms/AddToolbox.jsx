import { React, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import { Button, DatePicker, Form, Input, Upload, Select, message } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import events from 'events';
import ajax from '../../utils/ajax'
import "./AddToolbox.css";

const emitter = new events.EventEmitter();

const AddToolbox = () => {

  var node = {
    type: [{
      target_id: 'article',
      target_type: 'node_type',
    }],
    title: [{
      value: 'Dummy Title' + Math.floor(Math.random() * 9),
    }],
    body: [{
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      format: 'plain_text',
    }],
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async () => {
    try {
      const axios = await ajax() // wait for an initialized axios object
      const response = await axios.post('/node', node) // wait for the POST AJAX request to complete
      console.log('Node created: ', response)
      emitter.emit('NODE_UPDATED')
    } catch (e) {
      console.log(e)
    }
    return ()=>{
      emitter.addListener('NODE_UPDATED', this.refresh)
    }
  },[]);

  const dateFormat = "YYYY/MM/DD";
  const arr = ['Not Identified', 'English', 'French', 'German', 'Spanish'];
  // FILE UPLOAD
  const propsUpload = {
    multiple: true,
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
  
      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`);
      }
  
      return isPDF || Upload.LIST_IGNORE;
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
      <h1>Add Toolbox For Construction Site Name</h1>
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
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>Upload</Button>
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
            {arr.map((item,i)=>{
              return <Option value={i}>{item}</Option>;
            })}
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

            <Button type="primary">+</Button><br />
            <Button type="primary">Save</Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddToolbox;
