import React from "react";
import { Input} from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./Gate.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Add, ReceiptLong } from "@mui/icons-material";
import { GateTable } from "../../../components/gateTable/GateTable";
import AddGateModal from "../../../components/addGateModal/AddGateModal";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Gate = () => {
  return (
    <div className="gateContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="gateList">
          <div className="title">
            <div className="gateTitle">
              <ReceiptLong /> Danh sách cổng
            </div>
            <div className="action">
              <Search
                placeholder="Tìm kiếm cổng"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <AddGateModal/>
            </div>
          </div>
          <GateTable/>
        </div>
      </div>
    </div>
  );
};
