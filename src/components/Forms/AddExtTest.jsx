import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const AddExtTest = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing last name',
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddExtTest;

// import { React, Fragment, useState } from "react";
// import { Col, Row } from "antd";
// import { Button, Form, Input, message } from "antd";
// import { useParams, useNavigate } from "react-router-dom";
// import Config from "../../config";
// import axios from "axios";
// import "./AddExternalWorker.css";

// const AddExtTest = () => {
//   const siteID = useParams();
//   const nav = useNavigate();
//   const [formValues, setFormValues] = useState([{ name: "", company : "", id: "", daysWorkedAtSite: "" }])

//   let handleChange = (i, e) => {
//     let newFormValues = [...formValues];
//     newFormValues[i][e.target.name] = e.target.value;
//     setFormValues(newFormValues);
//   }

// let addFormFields = () => {
//     setFormValues([...formValues, { name: "", email: "" }])
//   }

// // let removeFormFields = (i) => {
// //     let newFormValues = [...formValues];
// //     newFormValues.splice(i, 1);
// //     setFormValues(newFormValues)
// // }

//   // FORM SUBMISSION
//   const onFinish = (values) => {
//     const id = siteID.id;
//     console.log("Success:", values);
//     axios
//       .get(`${Config.drupal_live_url}/session/token`)
//       .then((tokenResponse) => {
//         axios({
//           method: "post",
//           url: `${Config.drupal_live_url}/node?_format=json`,
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRF-Token": tokenResponse.data,
//             "Access-Control-Allow-Origin": "*",
//           },
//           auth: {
//             username : `${sessionStorage.getItem("username")}`,
//             password: `${sessionStorage.getItem("password")}`
//           },
//           data: {
//             "type": "worker",
//             "title": {
//               "value": `${values.name}`,
//             },
//             "field_construction_site_ref": {
//               "value": `${id}`,
//             },
//             "field_first_name": {
//               "value": `${values.name}`,
//             },
//             "field_company_name": {
//               "value": `${values.company}`,
//             },
//             "field_field_unique": {
//               "value": `${values.id}`,
//             }
//           }
//         })
//           .then((postResponse) => {
//             // console.log(postResponse)
//             if(postResponse.status === 201){
//               message.success("Succesfully Added Worker")
//               nav(`/construction-sites-detail/${siteID.id}`)
//             } else{
//               message.error("Ooops Something Went Wrong !!")
//             }
//           })
//           .catch((postError) => {
//             console.log("postError",postError)
//           });
//       })
//       .catch((tokenError) => {});
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <Fragment>
//       <Row className="add-external-worker-wrapper">
//         <Col span={20}>
//           <h1 className="worker-heading">Add External Worker</h1>
//         </Col>
//         <Col span={20} className="middle-color">
//           <p className="general-info">General Info</p>
//           <Form
//             name="addExternalWorker"
//             layout="vertical"
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//           >
//             {/*========================================== FORM ITEM =========================================== */}
//             {formValues.map((element, index) => (
//                 <><Form.Item
//                     label="Name:"
//                     name="name"
//                     rules={[{ required: true, message: "Please Enter Name" }]}
//                 >
//                     <Input placeholder="Name"  defaultValue={element.name || ""} 
//                         onChange={e => handleChange(index, e)}
//                     />
//                 </Form.Item><Form.Item
//                     label="Company:"
//                     name="company"
//                     rules={[{ required: true, message: "Please Enter Company" }]}
//                 >
//                         <Input placeholder="Company" defaultValue={element.company || ""} onChange={e => handleChange(index, e)}/>
//                     </Form.Item><Form.Item
//                         label="ID:"
//                         name="id"
//                         rules={[{ required: true, message: "Please Enter ID" }]}
//                     >
//                         <Input placeholder="ID" defaultValue={element.id || ""} onChange={e => handleChange(index, e)} />
//                     </Form.Item><Form.Item
//                         label="Days worked at site:"
//                         name="daysWorkedAtSite"
//                         rules={[
//                             {
//                                 message: "Please Enter Days worked at site:",
//                             },
//                         ]}
//                     >
//                         <Input placeholder="Days worked at site:" defaultValue={element.daysWorkedAtSite || ""} onChange={e => handleChange(index, e)} />
//                     </Form.Item></>
//             ))}
            

//             <Form.Item
//               className="button-wrapper"
//               wrapperCol={{
//                 offset: 8,
//                 span: 24,
//               }}
//             >
//               <Button type="primary" onClick={() => addFormFields()}>+</Button>
//               <Button type="primary" htmlType="submit">
//                 Save
//               </Button>
//             </Form.Item>
//           </Form>
//         </Col>
//       </Row>
//     </Fragment>
//   );
// };

// export default AddExtTest;
