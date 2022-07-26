import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import axios from "axios";

const WorkerInfo = () => {
  const siteID = useParams();
  const url = `${process.env.REACT_APP_DRUPAL_URL}/worker-detail-rest-api/${siteID.id}`;
  const [workersInfo, setWorkersInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((workerInfoResponse) => {
        setWorkersInfo(workerInfoResponse.data);
        // console.log("workersInfo", workersInfo);
        setIsLoading(true);
      })
      .catch((workerInfoError) => {
        console.log("workerInfoError", workerInfoError);
      });
  }, [url]);
  return !isLoading ? (
    <Spin size="large"/>
  ) : (
    <Row>
      <Col>
        <h2>WorkerInfo</h2>
        {workersInfo.map((item) => {
          return (
            <div>
              <p>
                <span>ID</span>:<span>{item.field_company_id}</span>
              </p>
              <p>
                <span>field_company_name</span>:<span>{item.field_company_name}</span>
              </p>
              <p>
                <span>field_check_in_date</span>:<span>{item.field_check_in_date}</span>
              </p>
              <p>
                <span>field_field_unique</span>:<span>{item.field_field_unique}</span>
              </p>
              <p>
                <span>field_first_name</span>:<span>{item.field_first_name}</span>
              </p>
              <p>
                <span>field_insz</span>:<span>{item.field_insz}</span>
              </p>
              <p>
                <span>field_limos_number</span>:<span>{item.field_limos_number}</span>
              </p>
              <p>
                <span>field_remarks</span>:<span>{item.field_remarks}</span>
              </p>
              <p>
                <span>field_status</span>:<span>{item.field_status}</span>
              </p>
              <p>
                <span>field_type</span>:<span>{item.field_type}</span>
              </p>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default WorkerInfo;
