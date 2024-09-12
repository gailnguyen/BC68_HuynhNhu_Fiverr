import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { getLocalStorage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { getValueUserApi } from "../redux/nguoiDungSlice";
import { Link, Outlet } from "react-router-dom";
import { pathDefault } from "../common/path";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  // cách bắn action lên store thông qua dispatch (có dùng redux thunk)
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect dùng để kiếm tra dữ liệu user lưu trên local storage xem người dùng này có role admin hay user, nếu là user thì khi truy cập đúng path vào trang admin vẫn sẽ bị đá về google
  useEffect(() => {
    // tạo biến datalocal để kiểm tra thông tin người dùng
    let dataLocal = getLocalStorage("user");
    // console.log(dataLocal.user.role);
    dataLocal.user.role !== "ADMIN"
      ? (window.location.href = "https://google.com")
      : null;
  }, []);

  // useEffect mounting
  // useEffect(() => {
  //   dispatch(getValueUserApi());
  // }, []);

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={pathDefault.managerUser}>Người dùng</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link>Công việc</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link>Thuê công việc</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
