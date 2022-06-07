import { Button, Form, Input, Card, Layout, notification } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.min.css";
import { useUserAuth } from "../../context/UserAuthContext";

const { Content, Footer } = Layout;

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { resetPassword } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      successNotification();
    } catch (err) {
      setError(err.message);
      console.log(error);
      errorNotification();
    }
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Password Reset Failed",
      description:
        "Please ensure that the email is the same as the one you signed up with previously.",
    });
  };

  const successNotification = () => {
    notification["success"]({
      message: "Password Reset Successful",
      description:
        "Please follow the instructions sent to your email to reset your password! It might have been sent to your junk!",
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
                    PASSWORD RESET
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
                    Reset
                  </Button>
                </Form.Item>
                <br />
                <br />
              </Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Recalled your password?</span>
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

export default ResetPasswordPage;
