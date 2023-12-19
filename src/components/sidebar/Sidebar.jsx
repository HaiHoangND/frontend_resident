import React, { useState } from "react";
import "./sidebar.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import {
  Apartment,
  CircleNotifications,
  DoorSliding,
  ExitToApp,
  Hearing,
  QrCode,
  RoomService,
  Security,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Trang chủ", "1", <HomeOutlined style={{ fontSize: 20 }} />),
  getItem(
    "Dân cư",
    "/member",
    <UsergroupAddOutlined style={{ fontSize: 20 }} />
  ),
  getItem("Bảo vệ", "/gateKeeper", <Security style={{ fontSize: 20 }} />),
  getItem("Tòa nhà", "/building", <Apartment style={{ fontSize: 20 }} />),
  getItem("Danh sách cổng", "/gate", <DoorSliding style={{ fontSize: 20 }} />),
  getItem("Dịch vụ", "6", <RoomService style={{ fontSize: 20 }} />),
  getItem("Thông báo", "7", <CircleNotifications style={{ fontSize: 20 }} />),
  getItem(
    "Kiểm tra thông tin",
    "/check-info",
    <QrCode style={{ fontSize: 20 }} />
  ),
  getItem(
    "Quản lý ra vào",
    "/entry-exit",
    <ExitToApp style={{ fontSize: 20 }} />
  ),
  getItem("Vấn đề", "9", <Hearing style={{ fontSize: 20 }} />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div
      style={{
        width: 300,
        backgroundColor: "#DAFFFB",
        height: "100vh",
        position: "fixed",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          backgroundColor: "#64CCC5",
          height: 50,
          width: 50,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: "91.1vh", width: 300, backgroundColor: "#04364A" }}
        onClick={onClick}
        selectedKeys={[window.location.pathname]}
      />
    </div>
  );
};
