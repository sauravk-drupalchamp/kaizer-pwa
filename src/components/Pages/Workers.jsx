import { React, useState, useEffect } from "react";
import Config from "../../config";
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import axios from "axios";

const Workers = (props) => {
    const [workerInfo, setWorkerInfo] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const workerInfoUrl = `${Config.drupal_live_url}/workers-listing-rest-api/${props.siteID}`;

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
        <h4>Worker Info</h4>
        <Link to="/add-external-worker"><Button type="primary">Add Worker</Button></Link>
        <hr />
          {workerInfo.map((data,index) => {
            return (
              <div key={index}>
                <p>{data.title}</p>
                <p>{data.field_field_unique}</p>
              </div>
            );
          })}
        </div>
      );
}

export default Workers