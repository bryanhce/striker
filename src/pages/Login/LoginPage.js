import { Button, Form, Input, Card, Layout, notification } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react";
import { format } from "date-fns";

import "antd/dist/antd.min.css";
import "./LoginPage.css";

const { Content, Footer } = Layout;

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useUserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      const today = new Date();
      const todayString = format(today, "yyyy-MM-dd");
      navigate("/daily-task-list/" + todayString);
    } catch (err) {
      setError(err.message);
      console.log(error);
      errorNotification();
    }
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Login Failed",
    });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout
        style={{
          backgroundImage: "linear-gradient(100deg, #4f5663 0%, black 100%)",
        }}
      >
        <Content
          style={{
            margin: "5% 30% 10% 30%",
          }}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Card>
              <span
                style={{
                  padding: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "9vh",
                }}
              >
                <img
                  src={require("../../images/striker-title.png")}
                  alt="striker title"
                  className="login-stiker-logo"
                />
              </span>
              <Form
                name="basic"
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 12,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onSubmitCapture={handleSubmit}
              >
                <Form.Item
                  style={{
                    direction: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: "4vh",
                    }}
                    data-testid="subheader"
                  >
                    LOGIN
                  </span>
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                  data-testid="email"
                >
                  <Input onChange={(e) => setEmail(e.target.value)} />
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
                  data-testid="password"
                >
                  <Input.Password
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 2,
                    span: 16,
                  }}
                >
                  <Link to="/reset-password" data-testid="forgot-password">
                    Forgot Password?
                  </Link>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 1,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ marginRight: "5%" }}
                  >
                    Login
                  </Button>
                </Form.Item>
                <br />
                <br />
              </Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>No Account?</span>
                <Link to="/signup" style={{ fontSize: "20px" }}>
                  Create Account
                </Link>
              </div>
              <Footer
                style={{
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
              >
                Striker ©2022 Created by Head in the Clouds
              </Footer>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
