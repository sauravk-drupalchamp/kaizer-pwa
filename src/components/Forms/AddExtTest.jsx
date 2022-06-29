import { React, Fragment, useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Upload,
  Select,
  message,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Config from "../../config";
import axios from "axios";
import {
  InfoCircleOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./AddToolbox.css";
const { Option } = Select;
const AddExtTest = () => {
  const dateFormat = "YYYY/MM/DD";
  const [token, setToken] = useState("");
  const [fileID, setFileID] = useState([]);
  const constructionSite = useParams();
  const nav = useNavigate();
  const buttonRef = useRef(null);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      url: `${Config.drupal_live_url}/file/upload/node/toolbox/field_upload_pdf?_format=json`,
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
        console.log(fileUploadResponse.data.fid[0].value,"fileUploadResponse.data.fid")
        //setFileID(fileUploadResponse.data.fid[0].value);
        setFileID( arr => [...arr, `${fileUploadResponse.data.fid[0].value}`]);
        // console.log(fileID,"fileID")
      })
      .catch((fileUploadError) => {
        console.log("Eroor: ", fileUploadError);
        onError({ fileUploadError });
      });
  };

  // FORM SUBMISSION
  const onFinish = (values) => {
    // console.log("values",values)
    const l = values.toolboxData.length;
    console.log(l,"Length")
    for (var i = 0; i < l; i++) {
      console.log(values.toolboxData[i],i)
      console.log(`Name=${i}`, values.toolboxData[i].administrationName)
      console.log(`Date From=${i}`, values.toolboxData[i].dateFrom._d)
      console.log(`Date Untill=${i}`, values.toolboxData[i].dateUntill._d)
      console.log(`File=${i}`, values.toolboxData[i].fileUpload)
      console.log(`Language=${i}`, values.toolboxData[i].language)
      console.log(`fileID=${i}`,fileID[i])
      axios({
        method: "post",
        url: `${Config.drupal_live_url}/node?_format=json`,
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
          type: "toolbox",
          title: {
            value: `${values.toolboxData[i].administrationName}`,
          },
          field_construction_site_ref: {
            value: `${constructionSite.id}`,
          },
          field_date_from: {
            value: `${moment(values.toolboxData[i].dateFrom._d).format(
              "YYYY-MM-DD"
            )}`,
          },
          field_date_untill: {
            value: `${moment(values.toolboxData[i].dateUntill._d).format(
              "YYYY-MM-DD"
            )}`,
          },
          field_preferred_language_select: {
            value: `${values.toolboxData[i].language}`,
          },
          field_upload_pdf: {
            value: fileID[i],
          },
        },
      })
        .then((postResponse) => {
          // console.log(postResponse)
          if (postResponse.status === 201) {
            message.success("Succesfully Added Worker");
            // if(i === l){
            //   nav(`/construction-sites-detail/${constructionSite.id}`);
            // }
          } else {
            message.error("Ooops Something Went Wrong !!");
          }
        })
        .catch((postError) => {
          console.log("postError", postError);
        });
    }
  };

  useEffect(() => {
    buttonRef.current.click();
    axios
      .get(`${Config.drupal_live_url}/session/token`)
      .then((tokenResponse) => {
        setToken(tokenResponse.data);
      })
      .catch((tokenError) => {
        console.log("tokenError", tokenError);
      });
  }, []);
  return (
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
      <Form.List name="toolboxData">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  label="Administration Name"
                  // name="administrationName"
                  name={[name, "administrationName"]}
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
                {/* DATE PICKER */}
                <Form.Item
                  {...restField}
                  label="Date from:"
                  // name="dateFrom"
                  name={[name, "dateFrom"]}
                  className="input-date"
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Date untill:"
                  // name="dateUntill"
                  name={[name, "dateUntill"]}
                  className="input-date"
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                {/* UPLOAD */}
                <Form.Item
                  {...restField}
                  label="Files:"
                  // name="fileUpload"
                  name={[name, "fileUpload"]}
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
                {/* LANGUAGE SELECT */}
                <Form.Item
                  {...restField}
                  // name="language"
                  name={[name, "language"]}
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
                    <Option value="En">English</Option>
                    <Option value="FR">French</Option>
                    <Option value="SE">Sweden</Option>
                    <Option value="Cn">Chinese</Option>
                  </Select>
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <Button
                ref={buttonRef}
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddExtTest;
