import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { publicRequest } from "../../requestMethods";
import { Link} from "react-router-dom";
import UpdateBuildingModal from "../updateBuildingModal/UpdateBuildingModal";

export const BuildingTable = () => {
  const [buildings, setBuildings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const getBuildings = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get(
        `/building?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setBuildings(res.data.data.content);
      setTotalCount(res.data.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuildings(1);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => (
        <Link to={`/building/${id}`}>
          <span>{id}</span>
        </Link>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      render: (position) => <span>{position}</span>,
    },
    {
      title: "Cập nhật thông tin",
      align: "center",
      render: (_, record) => <UpdateBuildingModal building={record} />,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={buildings}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getBuildings(page);
        },
      }}
    />
  );
};
