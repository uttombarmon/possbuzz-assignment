import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import type { Route } from "./+types/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "lib/api/apiIntercepters";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Possbuzz Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const { Title, Text } = Typography;
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    // console.log(values);
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", values);

      // Store the JWT token for the Axios interceptor
      localStorage.setItem("token", response.data.accessToken);

      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>PosBuzz</Title>
          <Text type="secondary">Sign in to manage your store</Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link to="/register">Log in</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
