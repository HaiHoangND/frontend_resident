import React from "react";
import { Input } from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./VisitorRequest.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { ReceiptLong } from "@mui/icons-material";
import { EntryExitTable } from "../../../components/entryexitTable/EntryExitTable";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const VisitorRequest = () => {
  return (
    <div className="visitorContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="visitorList">
          <div className="title">
            <div className="visitorTitle">
              <ReceiptLong /> Danh sách ra vào
            </div>
            <div className="action">
              <Search
                placeholder="Tìm kiếm người ra vào"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
            </div>
          </div>
          <EntryExitTable />
        </div>
      </div>
    </div>
  );
};
