import { React, useEffect } from "react";
import Config from "../../config";
import axios from "axios";

const ConstructionSites = () => {
  useEffect(() => {
    var username = "admin";
    var password = "admin";
    var basicAuth = "Basic " + btoa(username + ":" + password);

    axios
      .get(`${Config.drupal_local_url}/session/token`)
      .then((res) => {
        console.warn(res.data);

        const headers = {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": res.data,
          "Access-Control-Expose-Headers": "*",
          "Authorization": basicAuth,
        };

        axios
          .post(
            `${Config.drupal_local_url}/node/10`,
            {
              _links: {
                type: {
                  href: "http://drupal-121194-391381.cloudwaysapps.com/rest/type/node/page",
                },
              },
              title: [
                {
                  value: "My first page",
                },
              ],
            },
            {
              headers,
            }
          )
          .then((response) => (console.log(response)));
      })
      .catch((err) => {
        console.warn(err);
      });
    // var node = {
    //   type: [{
    //     target_id: 'article',
    //     target_type: 'node_type',
    //   }],
    //   title: [{
    //     value: 'Dummy',
    //   }],
    //   body: [{
    //     value: 'Dummy Body',
    //     format: 'plain_text',
    //   }],
    // };

    // axios.post(`${Config.drupal_local_url}/node`, node).then((res)=>{
    //   console.log(res,'=====RESPONSE')
    // }).catch((err)=>{
    //   console.log(err)
    // })
  }, []);

  return <h1>ConstructionSites</h1>;
};

export default ConstructionSites;
