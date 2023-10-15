import React from "react";
import "./topbar.scss";

export const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div>
        <Avatar size={40} icon={<UserOutlined />} className="mr-3" />
      </div>
    </div>
  );
};
