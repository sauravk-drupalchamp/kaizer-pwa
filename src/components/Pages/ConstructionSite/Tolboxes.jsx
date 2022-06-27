import { React, useState, useEffect } from "react";
import { Button, Table, Spin, message } from "antd";
import { EyeOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../../../config";
import axios from "axios";

const Tolboxes = (props) => {
  const [toolboxesInfo, setToolboxesInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const toolboxesInfoUrl = `${Config.drupal_live_url}/toolboxes-listing-rest-api/${props.siteID}`;
  const { tableData, columns } = getTableData();
  const nav = useNavigate();
  const siteID = useParams();
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
    <h1>
      <Spin size="large" />
    </h1>
  ) : (
    <div className="toolboxes-info-wrapper">
      <div className="toolboxes-info-heading">
        <h4>Toolboxes Info</h4>
        <Link to={`/add-toolbox/${props.siteID}`}>
          <Button type="primary">+</Button>
        </Link>
      </div>
      <hr />
      <Table dataSource={tableData} columns={columns} />
    </div>
  );

  function getTableData() {
    const tableData = toolboxesInfo.map((item, index) => {
      const title = item.title;
      const date_from = item.field_date_from;

      const handleDeleteClick = (e) => {
        // console.log(e.currentTarget.id)
        const nid = e.currentTarget.id;

        axios
          .get(`${Config.drupal_live_url}/session/token`)
          .then((tokenResponse) => {
            axios({
              method: "delete",
              url: `${Config.drupal_live_url}/node/${nid}?_format=json`,
              headers: {
                "X-CSRF-Token": `${tokenResponse.data}`,
              },
              auth: {
                username: `${sessionStorage.getItem("username")}`,
                password: `${sessionStorage.getItem("password")}`,
              },
            })
              .then((deleteResponse) => {
                // console.log("deleteResponse",deleteResponse)
                if(deleteResponse.status === 204){
                  message.success("Deleted Successfully")
                  // nav(`/construction-sites-detail/${siteID.id}`);
                  window.location.href = `/construction-sites-detail/${siteID.id}`;
                }else{
                  message.error("Ooops something went wrong!")
                }
              })
              .catch((deleteError) => {
                console.log("deleteError",deleteError)
              });
          })
          .catch((tokenError) => {
            console.log("tokenError", tokenError);
          });
      };

      return {
        key: index,
        name: title,
        date_from: date_from,
        action_view: (
          <div>
            <EyeOutlined />{" "}
            <span onClick={handleDeleteClick} id={item.nid}>
              {" "}
              <DeleteTwoTone />
            </span>{" "}
          </div>
        ),
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
};

export default Tolboxes;
