import { React, useState, useEffect } from "react";
import { Space, DatePicker, Select, Button, Form, Table, Progress, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import moment from 'moment'
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const Workers = (props) => {
  const siteID = useParams();
  const [dateF, setDateF] = useState(0);
  const [dateU, setDateU] = useState(0);
  const [workerInfo, setWorkerInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const workerInfoUrl = `${process.env.REACT_APP_DRUPAL_URL}/workers-listing-rest-api/${props.siteID}`;

  const { tableData, columns } = getTableData();

  const onFinish = (values) => {
    console.log(`${moment(values.dateFrom._d).format("YYYY-MM-DD")}`)
    console.log(`${moment(values.dateUntill._d).format("YYYY-MM-DD")}`)
    console.log(values.type)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFromChange = (date, dateString) => {
    // console.log(date, dateString);
    // console.log(`${moment(dateString).format("X")}`)
    setDateF(`${moment(dateString).format("X")}`);
    console.log("dateF",dateF)
  };

  const onUntillChange = (date, dateString) => {
    // console.log(date, dateString);
    // console.log(`${moment(dateString).format("X")}`)
    setDateU(`${moment(dateString).format("X")}`);
    console.log("dateU",dateU)
    if(dateF > dateU) {
      alert("Start date should be smaller than end date");
    }
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
        <Space className="worker-information">
          <h4>Worker Info</h4>
          <Link to={`/add-external-worker/${siteID.id}`}>
            <Button type="primary">Add Worker</Button>
          </Link>
        </Space>

        <Space className="worker-filter">
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
                <Option value="Checkin at work">Checkin at work</Option>
                <Option value="External">External</Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form>
        </Space>
      </Space>
      <hr />
      <Table dataSource={tableData} columns={columns} className="worker-table" />
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
        action_view: <EyeOutlined />,
      };
    });
// <Link to={`/worker-details/${unique_Id}`}><EyeOutlined /></Link>,
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
