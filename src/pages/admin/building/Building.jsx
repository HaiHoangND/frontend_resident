import React from "react";
import { Input} from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./Building.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Add, ReceiptLong } from "@mui/icons-material";
import { BuildingTable } from "../../../components/buildingTable/BuildingTable";
import AddBuildingModal from "../../../components/addBuildingModal/AddBuildingModal";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Building = () => {
  return (
    <div className="buildingContainer">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="buildingList">
          <div className="title">
            <div className="buildingTitle">
              <ReceiptLong /> Danh sách tòa nhà
            </div>
            <div className="action">
              <Search
                placeholder="Tìm kiếm tòa nhà"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <AddBuildingModal/>
            </div>
          </div>
          <BuildingTable/>
        </div>
      </div>
    </div>
  );
};
