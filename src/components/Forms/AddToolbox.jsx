import { React, Fragment } from "react";
import { Col, Row } from "antd";
import { Button, DatePicker, Form, Input, Upload, Select, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Config from "../../config";
import axios from "axios";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "./AddToolbox.css";

const AddToolbox = () => {
  const dateFormat = "YYYY/MM/DD";
  // const langArr = ['En', 'Fr', 'Se', 'Cn'];

  const constructionSite = useParams();
  const nav = useNavigate();

  // FILE UPLOAD
  const propsUpload = {
    multiple: true,
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf'

      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`)
      }

      return isPDF || Upload.LIST_IGNORE
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  // LANGUAGE
  const { Option } = Select

  // FORM SUBMISSION
  const onFinish = (values) => {
    console.log('Success:', values)
    
    axios
    .get(`${Config.drupal_live_url}/session/token`)
    .then((tokenResponse) => {
      axios({
        method: "post",
        url: `${Config.drupal_live_url}/node?_format=json`,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": tokenResponse.data,
          "Access-Control-Allow-Origin": "*",
        },
        auth: {
          username : `${sessionStorage.getItem("username")}`,
          password: `${sessionStorage.getItem("password")}`
        },
        data: {
          "type": "toolbox",
          "title": {
            "value": `${values.administrationName}`,
          },
          "field_construction_site_ref": {
            "value": `${constructionSite.id}`,
          },
          "field_date_from": {
            "value": `${moment(values.dateFrom._d).format('YYYY-MM-DD')}`,
          },
          "field_date_untill": {
            "value": `${moment(values.dateUntill._d).format('YYYY-MM-DD')}`,
          },
          "field_preferred_language_select": {
            "value": `${values.language}`,
          }
        }
      })
        .then((postResponse) => {
          // console.log(postResponse)
          if(postResponse.status === 201){
            message.success("Succesfully Added Worker")
            nav(`/construction-sites-detail/${constructionSite.id}`)
          } else{
            message.error("Ooops Something Went Wrong !!")
          }
        })
        .catch((postError) => {
          console.log("postError",postError)
        });
    })
    .catch((tokenError) => {});
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Fragment>
      <Row className="add-toolbox-wrapper">
        <Col span={20}>
          <h1 className="toolbox-heading">
            Add Toolbox For {constructionSite.id}
          </h1>
        </Col>
        <Col span={20} className="toolbox-column">
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
            <div className="form-background-color">
            {/*========================================== FORM ITEM =========================================== */}
            <Form.Item
              label="Administration Name"
              name="administrationName"
              tooltip={{
                title: 'Please Enter Administration Name',
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                { required: true, message: 'Please Enter Administration Name' },
              ]}
            >
              <Input placeholder="Administration Name" />
            </Form.Item>
            <Form.Item
              label="Date from:"
              name="dateFrom"
              className="input-date"
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item
              label="Date untill:"
              name="dateUntill"
              className="input-date"
            >
              <DatePicker format={dateFormat} />
            </Form.Item>{' '}
            <br />
            {/* -----------------------------------------UPLOAD--------------------------------------- */}
            <Form.Item label="Files:" className="file-language-add-btn file-wrapper">
              <Upload {...propsUpload}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            {/*------------------------------------- LANGUAGE -------------------------------------*/}
            <Form.Item
              name="language"
              label="Language:"
              className="file-language-add-btn language"
            >
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="N/L"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {/* {langArr.map((item, i) => {
                  return <Option value={i}>{item}</Option>
                })} */}
                <Option value="En">English</Option>
                <Option value="FR">French</Option>
                <Option value="SE">Sweden</Option>
                <Option value="Cn">Chinese</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="file-language-add-btn"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="add-save-btn">
                Add
              </Button>
            </Form.Item>
            <br />
            <Button type="primary" className="plus-btn">+</Button>
            </div>
            <Button type="primary" className="toolbox-save-btn">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AddToolbox
