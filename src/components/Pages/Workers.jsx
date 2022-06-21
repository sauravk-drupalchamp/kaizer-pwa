import { React, useState, useEffect } from "react";
import Config from "../../config";
import { Space, DatePicker, Select, Button, Form } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const Workers = (props) => {
  const [workerInfo, setWorkerInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const workerInfoUrl = `${Config.drupal_live_url}/workers-listing-rest-api/${props.siteID}`;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFromChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onUntillChange = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    axios
      .get(workerInfoUrl)
      .then((workerInfoResponse) => {
        setWorkerInfo(workerInfoResponse.data);
        // console.log(workerInfoResponse.data);
        setIsLoaded(true);
      })
      .catch((workerInfoError) => {
        console.log(workerInfoError, "workerInfoError");
      });
  }, []);

  return !isLoaded ? (
    <h1>Loading .....</h1>
  ) : (
    <div className="worker-info-wrapper">
      <Space direction="vertical">
        <Space>
          <h4>Worker Info</h4>
          <Link to="/add-external-worker">
            <Button type="primary">Add Worker</Button>
          </Link>
        </Space>

        <Space>
          <p>Filter:</p>
          <Form
            name="workersFilter"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            formLayout="inline"
          >
            <Form.Item
              name="dateFrom"
              rules={[
                {
                  required: true,
                  message: "Please input start date!",
                },
              ]}
            >
              <DatePicker placeholder="From" onChange={onFromChange} />
            </Form.Item>
            <Form.Item
              name="dateUntill"
              rules={[
                {
                  required: true,
                  message: "Please input end date!",
                },
              ]}
            >
              <DatePicker placeholder="Untill" onChange={onUntillChange} />
            </Form.Item>

            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please select type!",
                },
              ]}
            >
              <Select defaultValue="Type">
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form>
        </Space>
      </Space>
      <hr />
      {workerInfo.map((data, index) => {
        return (
          <div key={index}>
            <p>{data.title}</p>
            <p>{data.field_field_unique}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Workers;
