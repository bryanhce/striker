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
  const [error, setError] = useState("");

  const { signUp } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      successNotification();
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(error);
      errorNotification();
    }
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Sign Up Failed",
    });
  };

  const successNotification = () => {
    notification["success"]({
      message: "Sign Up Successful",
      description:
        "You are now redicted to the login page. Login with the same credentials!",
      duration: 6.0,
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
                      message: "Password should be at least 6 characters long",
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
