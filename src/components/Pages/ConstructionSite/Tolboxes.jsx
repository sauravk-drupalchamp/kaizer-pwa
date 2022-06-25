import { React, useState, useEffect } from "react";
import { Button, Table, Spin } from 'antd'
import { EyeOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import Config from "../../../config";
import axios from "axios";

const Tolboxes = (props) => {
    const [toolboxesInfo, setToolboxesInfo] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const toolboxesInfoUrl = `${Config.drupal_live_url}/toolboxes-listing-rest-api/${props.siteID}`;
    const { tableData, columns } = getTableData();
    useEffect(() => {
        axios
          .get(toolboxesInfoUrl)
          .then((toolboxesInfoResponse) => {
            setToolboxesInfo(toolboxesInfoResponse.data);
            // console.log(toolboxesInfoResponse.data);
            setIsLoaded(true);
          })
          .catch((toolboxesInfoError) => {
            console.log(toolboxesInfoError, "toolboxesInfoError");
          });
      }, [toolboxesInfoUrl]);

    return !isLoaded ? (
    <h1><Spin size="large" /></h1>
  ) : (
    <div className="toolboxes-info-wrapper">
    <h4>Toolboxes Info</h4>
    <Link to={`/add-toolbox/${props.siteID}`}><Button type="primary">+</Button></Link><hr />
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
  
  function getTableData() {
    const tableData = toolboxesInfo.map((item, index) => {
      const title = item.title;
      const date_from = item.field_date_from;

      return {
        key: index,
        name: title,
        date_from: date_from,
        action_view: <div><EyeOutlined /><DeleteTwoTone /> </div>,
      };
    });

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Date From",
        dataIndex: "date_from",
        key: "date_from",
      },
      {
        title: "Actions",
        dataIndex: "action_view",
        key: "action_view",
      },
    ];
    return { tableData, columns };
  }

}

export default Tolboxes