import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Card } from "antd";
import { publicRequest, userRequest } from "../../requestMethods";
const { Meta } = Card;
import { Pagination } from "antd";
import { useParams } from "react-router-dom";
import "./RoomList.scss";
import UpdateRoomModal from "../updateRoomModal/UpdateRoomModal";

export const RoomList = () => {
  let { id } = useParams();
  const buildingId = id;
  const [roomData, setRoomData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 9;
  //   const [isLoading, setIsLoading] = useState(true);
  const getRooms = async (currentPage) => {
    try {
      //   setIsLoading(true);
      const res = await userRequest.get(
        `/building/${buildingId}?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setRoomData(res.data.data.content);
      setTotalCount(res.data.data.totalElements);
      setPage(currentPage);
      //   setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRooms(1);
  }, []);
  const changePage = (page) => {
    getRooms(page);
  };

  return (
    <div className="roomListContainer">
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {roomData.map((room) => (
          <Col key={room.id} className="gutter-row" span={8}>
            <Card
              style={{
                width: 200,
                marginBottom: 20,
              }}
              cover={<img alt="example" src={room.image} />}
              actions={[<UpdateRoomModal room={room} />]}
            >
              <Meta
                title={`Số phòng: ${room.number}`}
                description={`${room.building.name}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        pageSize={pageSize}
        defaultCurrent={page}
        total={totalCount}
        onChange={changePage}
      />
    </div>
  );
};
