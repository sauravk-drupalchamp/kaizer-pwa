import { React, useState, useEffect } from "react";
import Config from "../../../config";
import { WarningOutlined } from "@ant-design/icons";
import { Table, Spin, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkersToolbox = (props) => {
  const url = `${Config.drupal_live_url}/toolboxes-listing-per-worker-rest-api/${props.siteID}`;
  const [toolboxes, settoolboxes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  console.log(url, "url");
  const { tableData, columns } = getTableData();
  useEffect(() => {
    axios
      .get(url)
      .then((toolboxesResponse) => {
        settoolboxes(toolboxesResponse.data);
        // console.log("toolboxes", toolboxes);
        setisLoading(true);
      })
      .catch((toolboxesError) => {
        console.log("toolboxesError", toolboxesError);
      });
  }, [url]);
  return !isLoading ? (
    <Spin size="large" />
  ) : (
    <div>
      <h4>Toolboxes</h4>
      <Link to={`/add-toolbox-per-worker/${props.siteID}`}>
        <Button type="primary">Add Toolboxes</Button>
      </Link>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );

  function getTableData() {
    const tableData = toolboxes.map((item, index) => {
      const title = item.title;

      return {
        key: index,
        name: title,
        signed: <WarningOutlined />,
        action_view: <Tag color="#2db7f5">Sign Now</Tag>,
      };
    });

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Signed",
        dataIndex: "signed",
        key: "signed",
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

export default WorkersToolbox;
