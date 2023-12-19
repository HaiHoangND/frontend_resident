import React from "react";
import { Input} from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./GateKeeper.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Add, ReceiptLong } from "@mui/icons-material";
import { GateKeeperTable } from "../../../components/gateKeeperTable/GateKeeperTable";
import AddGateKeeperModal from "../../../components/addGatekeeperModal/AddGateKeeperModal";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const GateKeeper = () => {
  return (
    <div className="gateKeeperContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="gateKeeperList">
          <div className="title">
            <div className="gateKeeperTitle">
              <ReceiptLong /> Danh sách bảo vệ
            </div>
            <div className="action">
              <Search
                placeholder="Tìm kiếm bảo vệ"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <AddGateKeeperModal/>
            </div>
          </div>
          <GateKeeperTable/>
        </div>
      </div>
    </div>
  );
};
