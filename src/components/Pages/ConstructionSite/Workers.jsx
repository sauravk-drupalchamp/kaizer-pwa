import { React, useState, useEffect } from "react";
import Config from "../../../config";
import { Space, DatePicker, Select, Button, Form, Table, Progress, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const Workers = (props) => {
  const siteID = useParams();
  const [workerInfo, setWorkerInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const workerInfoUrl = `${Config.drupal_live_url}/workers-listing-rest-api/${props.siteID}`;

  const { tableData, columns } = getTableData();

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
  }, [workerInfoUrl]);

  return !isLoaded ? (
    <h1><Spin size="large" /></h1>
  ) : (
    <div className="worker-info-wrapper">
      <Space direction="vertical">
        <Space>
          <h4>Worker Info</h4>
          <Link to={`/add-external-worker/${siteID.id}`}>
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
      <Table dataSource={tableData} columns={columns} />
    </div>
  );

  function getTableData() {
    const tableData = workerInfo.map((item, index) => {
      const title = item.title;
      const unique_Id = item.field_field_unique;
      const per = Math.floor(Math.random() * 100);

      return {
        key: index,
        name: title,
        id: unique_Id,
        tool_sign: (
          <Progress
            percent={per}
            status={per < 50 ? "exception" : "active"}
            size="small" />
        ),
        action_view: <Link to={`/worker-details/${unique_Id}`}><EyeOutlined /></Link>,
      };
    });

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Toolboxes signed",
        dataIndex: "tool_sign",
        key: "tool_sign",
      },
      {
        title: "Actions",
        dataIndex: "action_view",
        key: "action_view",
      },
    ];
    return { tableData, columns };
  }
};

export default Workers;
