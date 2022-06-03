import { Button, Form, Input, Card, Layout, notification } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.min.css";
import { useUserAuth } from "../../context/UserAuthContext";

const { Content, Footer } = Layout;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useUserAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const triggerErrorNotification = () => {
    if (error) {
      notification["error"]({
        message: "Sign Up Failed",
        description: error,
      });
    }
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
                <i>STRIKER</i>
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
                  >
                    SIGN UP
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
                >
                  <Input.Password
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                    onClickCapture={triggerErrorNotification}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <br />
                <br />
              </Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Already have an account?</span>
                <Link to="/" style={{ fontSize: "20px" }}>
                  Login here
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

export default SignUpPage;
