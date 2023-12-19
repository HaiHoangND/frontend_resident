import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import UpdateGateModal from "../updateGateModal/UpdateGateModal";

export const GateTable = () => {
  const [gates, setGates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getGates = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get(
        `/gate?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setGates(res.data.data.content);
      setTotalCount(res.data.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGates(1);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Loại cổng",
      dataIndex: "category",
      render: (category) =>{
        let gateCategory;
        switch (category) {
          case "IN":
            gateCategory = "Cổng vào";
            break;
          case "OUT":
            gateCategory = "Cổng ra";
            break;
        }
        return(<span>{gateCategory}</span>)
      },
    },
    {
      title: "Cập nhật thông tin",
      align: "center",
      render: (_, record) => (
        <UpdateGateModal gate={record} />
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={gates}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getGates(page);
        },
      }}
    />
  );
};
