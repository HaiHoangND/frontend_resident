import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { List } from "antd";
import { publicRequest, userRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import UpdateMemberModal from "../updateMemberModal/UpdateMemberModal";

export const MemberTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getUsers = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await userRequest.get(
        `/user?pageNumber=${currentPage}&pageSize=${pageSize}&role=MEMBER`
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
            {workingStatus === true ? "Đang sinh sống" : "Đã rời đi"}
          </Tag>
        );
      },
    },
    {
      title: "Cập nhật thông tin",
      align: "center",
      render: (_, record) => <UpdateMemberModal user={record} />,
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
      expandable={{
        expandedRowRender: (record) => (
          <List
            itemLayout="horizontal"
            dataSource={record.rooms}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.building.name}, phòng ${item.number}`}
                />
              </List.Item>
            )}
          />
        ),
      }}
    />
  );
};
