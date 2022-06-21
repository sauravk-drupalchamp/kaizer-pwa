import { React, useState, useEffect } from "react";
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Config from "../../config";
import axios from "axios";

const Tolboxes = (props) => {
    const [toolboxesInfo, setToolboxesInfo] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const toolboxesInfoUrl = `${Config.drupal_live_url}/toolboxes-listing-rest-api/${props.siteID}`;

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
      }, []);

    return !isLoaded ? (
    <h1>Loading .....</h1>
  ) : (
    <div className="toolboxes-info-wrapper">
    <h4>Toolboxes Info</h4>
    <Link to={`/add-toolbox/${props.siteID}`}><Button type="primary">+</Button></Link><hr />
      {toolboxesInfo.map((data,index) => {
        return (
          <div key={index}>
            <p>{data.title}</p>
            <p>{data.field_date_from}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Tolboxes