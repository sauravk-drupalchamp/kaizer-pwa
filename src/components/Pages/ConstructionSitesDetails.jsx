import {React, useState, useEffect} from 'react'
import config from '../../config';
import axios from 'axios';

const ConstructionSitesDetails = () => {
  const [constructionSiteData, setConstructionSiteData] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  //const [nid, setNid] = useState();

  const siteID = (window.location.pathname).substr(27);
  // console.log(siteID);

  useEffect(()=>{
    axios.get(`${config.drupal_live_url}/construction-sites-detail-rest-api/${siteID}`).then((constructionSiteResponse)=>{
      setConstructionSiteData(constructionSiteResponse.data);
      // console.log(constructionSiteResponse);
      //setNid(constructionSiteResponse.data[0].nid,"constructionSiteResponse.data[0].nid");
      // console.log(constructionSiteResponse.data[0].nid,"NID");

      // axios.get(`${config.drupal_live_url}/toolboxes-listing-rest-api/${nid}`).then((toolboxesResponse)=>{
      //   console.log(toolboxesResponse.data)
      // }).catch((toolboxesError)=>{
      //   console.log("toolboxesError",toolboxesError)
      // })
      //console.log(`${config.drupal_live_url}/toolboxes-listing-rest-api/${nid}`)
      setIsLoaded(true)
    }).catch((constructionSiteError)=>{
      console.log("constructionSiteError",constructionSiteError)
    })
  });
  if(!isLoaded){
    return <h1>Loading .......</h1>
  }else{
      return(
        constructionSiteData.map((item,index)=>{
          // if(nid){
          //   setNid(item.nid)
          // }
          //console.log(nid,"NID")
          return <div>
            <p>General Info</p>
            <p>{item.title}</p>
            <p>{item.field_address}</p>
            <p>{item.field_date_from}</p>
            <p>{item.field_date_untill}</p>
            <p>{item.nid}</p>
          </div>
        })
      );
  }
  
}

export default ConstructionSitesDetails