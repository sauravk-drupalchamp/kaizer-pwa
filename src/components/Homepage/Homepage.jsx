import { React } from "react";
import axios from "axios";
import { Col, Row, message } from "antd";
import { Button, Form, Input } from "antd";
import { useAuth } from "../../context/auth-context";
import bannerImage from "../../assets/homepage-banner.png";
import "./Homepage.css";

const Homepage = (props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const auth = useAuth();
  const onFinish = (values) => {
    const userName = values.username;
    const passWord = values.password;

    const error = () => {
      message.error("Invalid Username/Password");
    };

    axios
      .get(`${process.env.REACT_APP_DRUPAL_URL}/session/token`)
      .then((res) => {
        // console.log(res.data);

        axios({
          method: "post",
          url: `${process.env.REACT_APP_DRUPAL_URL}/user/login?_format=json`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": res.data,
          },
          data: {
            name: userName,
            pass: passWord,
          },
        })
          .then((response) => {
            // console.log(response);
            const crsf_token = response.data.csrf_token;
            const logout_token = response.data.logout_token;
            // const current_user = response.data.current_user.name;
            const user_id = response.data.current_user.uid;

            // console.log("crsf_token====", crsf_token);
            // console.log("logout_token====", logout_token);
            // console.log("current_user====", current_user);
            // console.log("user_id====", user_id);

            // console.log(`${process.env.REACT_APP_DRUPAL_URL}/rest/user/${user_id}`);

            axios
              .get(`${process.env.REACT_APP_DRUPAL_URL}/rest/user/${user_id}`)
              .then((roleResponse) => {
                // console.log("roleResponse",roleResponse.data[0].mail);

                if (roleResponse.data[0].roles_target_id === "Supervisor") {
                  // setIsLoggedIn(true)
                  // props.onLogin();
                  // console.log(roleResponse.data[0].mail,"roleResponse.data[0].mail")
                  // localStorage.setItem("crsf_token", crsf_token);
                  // localStorage.setItem("logout_token", logout_token);
                  // localStorage.setItem("username",userName);
                  // localStorage.setItem("password",passWord);
                  sessionStorage.setItem("crsf_token", crsf_token);
                  sessionStorage.setItem("logout_token", logout_token);
                  sessionStorage.setItem("username", userName);
                  sessionStorage.setItem("password", passWord);
                  sessionStorage.setItem("email", roleResponse.data[0].mail);
                  sessionStorage.setItem("user_id", user_id);
                  auth.login();
                } else {
                  error();
                }
              })
              .catch((roleResponseError) => {
                console.log("roleResponseError", roleResponseError);
              });
          })
          .catch((err) => {
            console.log("Error", err);
            error();
          });
      })
      .catch((err) => {
        console.warn(err);
      });

    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12} className="homepage-banner">
        <img src={bannerImage} alt="homepage-banner" />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} className="form-wrapper">
        <div>
        <h1>Login to account</h1>
        <span>Please enter your email id and password to continue</span>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Email Address"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password autoComplete="true" />
          </Form.Item>
          
          <Form.Item
          >
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
          <p className="forgot-password"><a href="http://drupaldev.kaizerstaging.creathing.be/user/password">Forgot Password?</a></p> 
        </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Homepage;
