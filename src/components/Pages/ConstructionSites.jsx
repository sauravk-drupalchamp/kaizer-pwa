import { Fragment, React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Row, Col, Progress } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./ConstructionSites.css";
import jQuery from "jquery";
import axios from "axios";

const ConstructionSites = () => {
  jQuery(document).ready(function (){
    const numberOfRows = jQuery(".ant-row.construction-sites-row .ant-table-wrapper.construction-sites-table tbody.ant-table-tbody tr").length;
    if(numberOfRows < 10 ) {
      jQuery(".ant-row.construction-sites-row .ant-table-wrapper.construction-sites-table ul.ant-pagination.ant-table-pagination.ant-table-pagination-right").css("display","none");
    }else {
      jQuery(".ant-row.construction-sites-row .ant-table-wrapper.construction-sites-table ul.ant-pagination.ant-table-pagination.ant-table-pagination-right").css("display","flex");
    }
  });
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [networkDataReceived, setNetworkDataReceived] = useState(true)

  const { tableData, columns } = getTableData();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DRUPAL_URL}/construction-sites`)
      .then((response) => {
        setItems(response.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
        // if(!window.navigator.onLine){
        //   setIsLoaded(true)
        // }
        setNetworkDataReceived(false);
      });
    // fetch(`${process.env.REACT_APP_DRUPAL_URL}/construction-sites`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setItems(data);
    //     setIsLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.log("Fetch Err",err)
    //     setNetworkDataReceived(false)
    //   });

      if(!window.navigator.onLine){
        if ('caches' in window) {
          console.log("Caches in Windows")
          caches.match(`${process.env.REACT_APP_DRUPAL_URL}/construction-sites`)
            .then(function(response) {
              if (response) {
                return response.json();
              }
            })
            .then(function(data) {
              if (!networkDataReceived) {
                console.log('From cache', data);
                setItems(data);
                setIsLoaded(true);
              }
            });
        }
      }
  }, [networkDataReceived]);

  return !isLoaded ? (
    <Spin size="large" />
  ) : (
    <Fragment>
      <Row className="construction-sites-row">
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          lg={{
            span: 16,
            offset: 4,
          }}
          md={{
            span: 20,
            offset: 2,
          }}
        >
          <h1>Construction Sites</h1>
        </Col>
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          lg={{
            span: 16,
            offset: 4,
          }}
          md={{
            span: 20,
            offset: 2,
          }}
          className="construction-sites-col"
        >
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
      const adminTitle = item.field_admin_title;
      const per = Math.floor(Math.random() * 100);
      return {
        key: index,
        date_from: dateFrom,
        unique_Id: uniqueId,
        admin_title: adminTitle,
        tool_sign: (
          <Progress
            percent={per}
            status={per <= 50 ? "exception" : null}
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
        title: "Admin Title",
        dataIndex: "admin_title",
        key: "admin_title",
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
