import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import UpdateGateKeeperModal from "../updateGateKeeperModal/UpdateGateKeeperModal";

export const GateKeeperTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getUsers = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get(
        `/user?pageNumber=${currentPage}&pageSize=${pageSize}&role=GATEKEEPER`
      );
      setUsers(res.data.data.content);
      setTotalCount(res.data.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(1);
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
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => <span>{gender}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: "Tên cổng",
      dataIndex: "gate",
      render: (gate) => <span>{gate.name}</span>,
    },
    {
      title: "Trạng thái người dùng",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        let workingStatus = status;
        let tagColor;
        switch (workingStatus) {
          case false:
            tagColor = "volcano";
            break;
          case true:
            tagColor = "green";
            break;
        }

        return (
          <Tag color={tagColor}>
            {workingStatus === true ? "Đang làm việc" : "Đã nghỉ việc"}
          </Tag>
        );
      },
    },
    {
      title: "Cập nhật thông tin",
      align: "center",
      render: (_, record) => (
        <UpdateGateKeeperModal user={record} />
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getUsers(page);
        },
      }}
    />
  );
};
