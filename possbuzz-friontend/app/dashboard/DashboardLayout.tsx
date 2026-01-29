import { Outlet, Navigate, useNavigate, useLocation } from "react-router";
import { Layout, Menu, Skeleton, Button, Space, Typography } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "lib/hooks/useAuth";

const { Header, Content, Sider } = Layout;

export default function DashboardLayout() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ padding: "50px" }}>
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "/dashboard/products",
      icon: <ShoppingOutlined />,
      label: "Products",
      onClick: () => navigate("/dashboard/products"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            color: "white",
            lineHeight: "32px",
          }}
        >
          POSBUZZ
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text strong>Inventory Management</Typography.Text>
          <Space>
            <UserOutlined />
            <span>{user.name}</span>
            <Button type="text" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Button>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
