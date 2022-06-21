import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";
import GeneralInfo from "./GeneralInfo";
import axios from "axios";

const ConstructionSitesDetails = () => {
  const [constructionSiteData, setConstructionSiteData] = useState([]);
  const [toolboxesData, setToolboxesData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const siteID = useParams();

  useEffect(() => {
    axios
      .get(
        `${config.drupal_live_url}/construction-sites-detail-rest-api/${siteID.id}`
      )
      .then((constructionSiteResponse) => {
        setConstructionSiteData(constructionSiteResponse.data);
        // console.log(constructionSiteResponse);
        // console.log(
        //   `${config.drupal_live_url}/toolboxes-listing-rest-api/${siteID.id}`
        // );

        const toolboxURL = `${config.drupal_live_url}/toolboxes-listing-rest-api/${siteID.id}`;
        const workerURL = `${config.drupal_live_url}/workers-listing-rest-api/${siteID.id}`;

        // const reqToolbox = axios.get(toolboxURL);
        // const reqWorker = axios.get(workerURL);

        // axios.all([reqToolbox, reqWorker]).then(axios.spread((...responses)=>{
        //   setToolboxesData(responses[0].data);
        //   setWorkersData(responses[1]);
        //   console.log(...responses);
        //   console.log(toolboxesData,"toolboxesData")
        //   console.log(workersData,"workersData")
        //   setIsLoaded(true);
        // })).catch((toolbox_worker_error)=>{
        //   console.log("toolbox_worker_error",toolbox_worker_error)
        // })

        axios
          .get(toolboxURL)
          .then((toolboxesResponse) => {
            setToolboxesData(toolboxesResponse.data);
            // console.log(toolboxesResponse.data);
            // console.log("toolboxesData",toolboxesData);
            axios
              .get(workerURL)
              .then((workersResponse) => {
                setWorkersData(workersResponse.data);
                // console.log(workersResponse.data);
                // console.log("workersData",workersData)
                setIsLoaded(true);
              })
              .catch((workersError) => {
                console.log("workersError", workersError);
              });
          })
          .catch((toolboxesError) => {
            console.log("toolboxesError", toolboxesError);
          });
      })
      .catch((constructionSiteError) => {
        console.log("constructionSiteError", constructionSiteError);
      });
  }, []);

  if (!isLoaded) {
    return <h1>Loading .......</h1>;
  } else {
    return constructionSiteData.map((item, index) => {
      return (
        <div>
          <p>General Info</p>
          <p>{item.title}</p>
          <p>{item.field_address}</p>
          <p>{item.field_date_from}</p>
          <p>{item.field_date_untill}</p>
          <p>{item.nid}</p>
          <GeneralInfo siteID={siteID.id} />
        </div>
      );
    });
  }
};

export default ConstructionSitesDetails;
