import React from "react";
import { Input} from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./member.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Add, ReceiptLong } from "@mui/icons-material";
import { MemberTable } from "../../../components/memberTable/memberTable";
import AddMemberModal from "../../../components/addMemberModal/AddMemberModal";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Member = () => {
  return (
    <div className="memberContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="memberList">
          <div className="title">
            <div className="memberTitle">
              <ReceiptLong /> Danh sách dân cư
            </div>
            <div className="action">
              <Search
                placeholder="Tìm kiếm dân cư"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <AddMemberModal/>
            </div>
          </div>
          <MemberTable/>
        </div>
      </div>
    </div>
  );
};
