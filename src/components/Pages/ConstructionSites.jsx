import { Fragment, React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Row, Col, Progress } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import './ConstructionSitesDetails.css'
import Config from "../../config";
import axios from "axios";

const ConstructionSites = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { tableData, columns } = getTableData();

  useEffect(() => {
    axios
      .get(`${Config.drupal_live_url}/construction-sites`)
      .then((response) => {
        setItems(response.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return !isLoaded ? (
    <Spin size="large" />
  ) : (
    <Fragment>
      <Row className="construction-sites-row">
        <Col span={16} offset={4} className="construction-sites-col">
        <h1>Construction Sites</h1>
          <h5>Construction Sites</h5>
          <Table
            className="construction-sites-table"
            dataSource={tableData}
            columns={columns}
          />
        </Col>
      </Row>
    </Fragment>
  );

  function getTableData() {
    const tableData = items.map((item, index) => {
      const dateFrom = item.field_date_from;

      const uniqueId = item.title;
      const per = Math.floor(Math.random() * 100);
      return {
        key: index,
        date_from: dateFrom,
        unique_Id: uniqueId,
        tool_sign: (
          <Progress
            percent={per}
            status={per < 50 ? "exception" : "active"}
            size="small"
          />
        ),
        action_view: (
          <Link to={`construction-sites-detail/${uniqueId}`}>
            <EyeOutlined />
          </Link>
        ),
      };
    });

    const columns = [
      {
        title: "Date From",
        dataIndex: "date_from",
        key: "date_from",
      },
      {
        title: "Site ID",
        dataIndex: "unique_Id",
        key: "unique_Id",
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

export default ConstructionSites;
