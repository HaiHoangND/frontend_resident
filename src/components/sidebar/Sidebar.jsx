import { Apartment, DoorSliding, LocalPolice, NotificationsActive, RoomService, Input, QrCode } from "@mui/icons-material";
import React from "react";
import "./sidebar.scss"

export const Sidebar = () => {
  const pathname = useLocation().pathname.split("/");
  return (
    <div className="sidebarContainer">
      <div className="soictLogoWrapper">
        <img
          src="https://soict.hust.edu.vn/wp-content/uploads/news_logo_soict_25_years.png"
          alt=""
        />
      </div>
      <hr />
      <div className="sidebarItemsWrapper">
        <Link to="/admin">
          <div
            className={
              pathname[1] === "admin" && !pathname[2]
                ? "sidebarItem selected"
                : "sidebarItem"
            }
          >
            <Home /> Trang chủ
          </div>
        </Link>
        <Link to="/member">
              <div
                className={
                  pathname[1] === "member"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <Group /> Dân cư
              </div>
        </Link>
        <Link to="/gatekeeper">
              <div
                className={
                  pathname[1] === "gatekeeper"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <LocalPolice /> Bảo vệ
              </div>
        </Link>
        <Link to="/building">
              <div
                className={
                  pathname[1] === "building" && !pathname[2]
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <Apartment /> Tòa nhà
              </div>
        </Link>
        <Link to="/gate">
              <div
                className={
                  pathname[1] === "gate"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <DoorSliding /> Danh sách cổng
              </div>
        </Link>
        <Link to="/service">
              <div
                className={
                  pathname[1] === "service"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <RoomService /> Dịch vụ
              </div>
        </Link>
        <Link to="/notification">
              <div
                className={
                  pathname[1] === "notification"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <NotificationsActive /> Thông báo
              </div>
        </Link>
        <Link to="/visitor">
              <div
                className={
                  pathname[1] === "visitor"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <Input /> Quản lý ra vào
              </div>
        </Link>
        <Link to="/complaint">
              <div
                className={
                  pathname[1] === "complaint"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <SupportAgent /> Vấn đề
              </div>
        </Link>
        <Link to="/qrcode">
              <div
                className={
                  pathname[1] === "qrcode"
                    ? "sidebarItem selected"
                    : "sidebarItem"
                }
              >
                <QrCode /> Kiểm tra thông tin
              </div>
        </Link>
      </div>
    </div>
  );
};
