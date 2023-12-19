import React from "react";
import "./topbar.scss";
import { Person } from "@mui/icons-material";
import { Dropdown, Badge } from "antd";
import { InfoCircleOutlined, BellOutlined } from "@ant-design/icons";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const role = authUser().role === "GATEKEEPER" ? "BẢO VỆ" : authUser().role;
  const signOut = useSignOut();
  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: "Thông tin tài khoản",
      icon: <InfoCircleOutlined />,
    },
    {
      key: "2",
      danger: true,
      label: "Đăng xuất",
      onClick: handleSignOut,
    },
  ];
  return (
    <div className="topbarContainer">
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <div className="person">
            <Person style={{ fontSize: 50 }} /> {role}
          </div>
        </a>
      </Dropdown>
    </div>
  );
};
