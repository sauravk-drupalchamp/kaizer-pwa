import { React, Fragment, useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Button, DatePicker, Form, Input, Upload, Select, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "./AddToolbox.css";

const AddToolbox = () => {
  const dateFormat = "YYYY/MM/DD";
  // const langArr = ['En', 'Fr', 'Se', 'Cn'];
  // const reader = new FileReader();
  const [token, setToken] = useState("");
  const [fileID, setFileID] = useState("");
  const workerID = useParams();
  const nav = useNavigate();

  // FILE UPLOAD
  const handleBeforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";

    if (!isPDF) {
      message.error(`${file.name} is not a PDF file`);
    }

    return isPDF || Upload.LIST_IGNORE;
  };
  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    // console.log(file,"File =======")
    // console.log(token)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_DRUPAL_URL}/file/upload/node/toolbox_per_worker/field_upload_pdf?_format=json`,
      headers: {
        "Content-Type": "application/octet-stream",
        "X-CSRF-Token": token,
        "Content-Disposition": `filename="${file.name}"`,
      },
      auth: {
        username: `${sessionStorage.getItem("username")}`,
        password: `${sessionStorage.getItem("password")}`,
      },
      data: file.uid,
    })
      .then((fileUploadResponse) => {
        onSuccess("Ok");
        // console.log("server res: ", fileUploadResponse);
        // console.log(fileUploadResponse.data.fid[0].value,"fileUploadResponse.data.fid")
        setFileID(fileUploadResponse.data.fid[0].value);
      })
      .catch((fileUploadError) => {
        console.log("Eroor: ", fileUploadError);
        onError({ fileUploadError });
      });
  };
  // LANGUAGE
  const { Option } = Select;

  // FORM SUBMISSION
  const onFinish = (values) => {
    // console.log("Success:", values);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_DRUPAL_URL}/node?_format=json`,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        "Access-Control-Allow-Origin": "*",
      },
      auth: {
        username: `${sessionStorage.getItem("username")}`,
        password: `${sessionStorage.getItem("password")}`,
      },
      data: {
        type: "toolbox_per_worker",
        title: {
          value: `${values.administrationName}`,
        },
        field_name: {
          value: `${values.administrationName}`,
        },
        field_worker_id: {
          value: `${workerID.id}`,
        },
        field_date_from: {
          value: `${moment(values.dateFrom._d).format("YYYY-MM-DD")}`,
        },
        field_date_untill: {
          value: `${moment(values.dateUntill._d).format("YYYY-MM-DD")}`,
        },
        field_preferred_language_select: {
          value: `${values.language}`,
        },
        field_upload_pdf: {
          value: fileID,
        },
      },
    })
      .then((postResponse) => {
        // console.log(postResponse)
        if (postResponse.status === 201) {
          message.success("Succesfully Added Worker");
          nav(`/worker-details/${workerID.id}`);
        } else {
          message.error("Ooops Something Went Wrong !!");
        }
      })
      .catch((postError) => {
        console.log("postError", postError);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DRUPAL_URL}/session/token`)
      .then((tokenResponse) => {
        setToken(tokenResponse.data);
      })
      .catch((tokenError) => {
        console.log("tokenError", tokenError);
      });
  }, []);
  return (
    <Fragment>
      <Row className="add-toolbox-wrapper">
        <Col span={20}>
          <h1 className="toolbox-heading">
            Add Toolbox Per Worker For {workerID.id}
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
                  title: "Please Enter Administration Name",
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Administration Name",
                  },
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
              </Form.Item>{" "}
              <br />
              {/* -----------------------------------------UPLOAD--------------------------------------- */}
              <Form.Item
                label="Files:"
                name="fileUpload"
                className="file-language-add-btn file-wrapper"
                rules={[
                  {
                    required: true,
                    message: "Please Upload PDF",
                  },
                ]}
              >
                <Upload
                  accept=".pdf"
                  beforeUpload={handleBeforeUpload}
                  customRequest={uploadImage}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="add-save-btn"
                >
                  Add
                </Button>
              </Form.Item>
              <br />
              <Button type="primary" className="plus-btn">
                +
              </Button>
            </div>
            <Button type="primary" className="toolbox-save-btn">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddToolbox;
