import { Button, Form, Input, Card, Result } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./SignUpPage.css";
import { useUserAuth } from "../../context/UserAuthContext";

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

  return (
    <div className="signup-div">
      <h1>
        <i>STRIKER SIGN UP</i>
      </h1>

      <Card>
        {error && (
          <Result status="error" title="Sign up failed" subTitle={error} />
        )}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onSubmitCapture={handleSubmit}
        >
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
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <span>
          Have an Account? <Link to="/">Login Here</Link>
        </span>
      </Card>
    </div>
  );
};

export default SignUpPage;
