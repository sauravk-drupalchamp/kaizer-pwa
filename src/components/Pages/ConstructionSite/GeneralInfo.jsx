import { React, useState, useEffect } from "react";
import Config from "../../../config";
import { Spin } from "antd";
import axios from "axios";

const GeneralInfo = (props) => {
  const [generalInfo, setGeneralInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const generalInfoUrl = `${Config.drupal_live_url}/construction-sites-detail-rest-api/${props.siteID}`;

  useEffect(() => {
    axios
      .get(generalInfoUrl)
      .then((generalInfoResponse) => {
        setGeneralInfo(generalInfoResponse.data);
        // console.log(generalInfoResponse.data);
        setIsLoaded(true);
      })
      .catch((generalInfoError) => {
        console.log(generalInfoError, "generalInfoError");
      });
  }, [generalInfoUrl]);

  return !isLoaded ? (
    <h1><Spin size="large"/></h1>
  ) : (
    <div className="general-info-wrapper">
    <h4>General Info</h4>
    <hr />
      {generalInfo.map((data,index) => {
        return (
          <div key={index}>
            <p>{data.title}</p>
            <p>{data.field_address}</p>
            <p>{data.field_date_from}</p>
            <p>{data.field_date_untill}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GeneralInfo;
