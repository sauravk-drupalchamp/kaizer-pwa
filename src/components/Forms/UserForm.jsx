import { React, Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Spin, Button, Form, Input, Select, message } from "antd";
import Config from "../../config";
const { Option } = Select;
const UserForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [passError, setPassError] = useState("");
  const [helpMessage, setHelpMessage] = useState();
  const userName = sessionStorage.getItem("username");
  const userID = sessionStorage.getItem("user_id");
  const pass = sessionStorage.getItem("password");
  const userURL = `${Config.drupal_live_url}/rest-user-mail/
    ${userID}`;

  const onFinish = (values) => {
    console.log("Success:", values);
    axios.get(`${Config.drupal_live_url}/session/token`).then((tokenResponse)=>{
      axios({
        method: "patch",
        url: `${Config.drupal_live_url}/user/${userID}?_format=json`,
        headers: {
          "X-CSRF-Token": tokenResponse.data,
          "Content-Type": "application/json",
        },
        auth: {
          username: userName,
          password: pass,
        },
        data: {
          pass: [{ existing: pass, value: `${values.confirmPassword}` }],
        },
      }).then((passwordUpdateResponse)=>{
        console.log("passwordUpdateResponse",passwordUpdateResponse)
        if(passwordUpdateResponse.status === 200){
          message.success("Password Updated Successfully")
          props.onLogout();
        }else{
          message.error("Oops! something went wrong")
        }
      }).then((passwordUpdateError)=>{
        console.log("passwordUpdateError",passwordUpdateError)
      })
    }).catch((tokenError)=>{
      console.log("tokenError",tokenError)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlePasswordChange = (e) => {
    // console.log(e.target.value)
    if (pass === e.target.value) {
      setPassError("error");
      setHelpMessage("Password should not match previous password!");
    } else {
      setPassError("validating");
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  useEffect(() => {
    axios.get(userURL).then((userResponse) => {
      setEmailData(userResponse.data[0].mail);
      // console.log("User emailData", emailData);
      setIsLoading(true);
    });
  }, [emailData, userURL]);

  return !isLoading ? (
    <Spin size="large" />
  ) : (
    <Fragment>
      <h1>My Account</h1>
      <Form
        {...formItemLayout}
        name="user"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
      >
        {/* USERNAME */}
        <Form.Item
          label="Username"
          name="username"
          disabled
          rules={[
            {
              message: "Please input your username!",
            },
          ]}
        >
          <Input defaultValue={userName} disabled={true} />
        </Form.Item>
        {/* USER EMAIL */}
        <Form.Item
          label="Email"
          name="userEmail"
          disabled
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input defaultValue={emailData} disabled={true} />
        </Form.Item>

        {/* USER PASSWORD */}
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          validateStatus={passError}
          help={helpMessage}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password allowClear onChange={handlePasswordChange} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item label="Language" formItemLayout="inline">
          <Select defaultValue="N/A">
            <Option value="En">English</Option>
            <Option value="FR">French</Option>
            <Option value="SE">Sweden</Option>
            <Option value="Cn">Chinese</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ "margin-top": "20px" }}>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default UserForm;
