import React, { useState } from "react";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { QrCode2 } from "@mui/icons-material";
import { PlusOutlined } from "@ant-design/icons";
import { CheckInformation } from "../../../components/checkInformation/CheckInformation";
import "./QrCode.scss";
import { Button } from "antd";

export const QrCode = () => {
  const [isAllowed, setIsAllowed] = useState(false);

  const handleAllowClick = () => {
    // Thực hiện các hành động bạn muốn khi nút "Cho phép" được nhấp
    setIsAllowed(true);
  };

  return (
    <div className="qrContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="qrList">
          <div className="title">
            <div className="qrTitle">
              <QrCode2 /> Kiểm tra thông tin
            </div>
            <div className="action">
              <Button
                type="primary"
                style={{ backgroundColor: "#176B87" }}
                onClick={handleAllowClick}
              >
                Cho phép
              </Button>
            </div>
          </div>
          <CheckInformation isAllowed={isAllowed}/>
        </div>
      </div>
    </div>
  );
};
