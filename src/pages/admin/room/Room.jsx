import React from 'react'
import { Input} from "antd";
import { Button } from "antd";
const { Search } = Input;
import "./Room.scss";
import { Topbar } from "../../../components/topbar/Topbar";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Add, ReceiptLong } from "@mui/icons-material";
import { RoomList} from "../../../components/roomList/RoomList";
import AddRoomModal from '../../../components/addRoomModal/AddRoomModal';

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Room = () => {
    return (
        <div className="roomContainer">
          <Sidebar />
          <div className="contentContainer">
            <Topbar />
            <div className="roomList">
              <div className="title">
                <div className="roomTitle">
                  <ReceiptLong /> Danh sách phòng
                </div>
                <div className="action">
                  <Search
                    placeholder="Tìm kiếm phòng"
                    onSearch={onSearch}
                    style={{
                      width: 200,
                    }}
                  />
                  <AddRoomModal/>
                </div>
              </div>
              <RoomList/>
            </div>
          </div>
        </div>
      );
}
