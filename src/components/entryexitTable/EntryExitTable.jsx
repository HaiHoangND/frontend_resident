import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import { formatDateTimeDetail } from "../../utils/formatStrings";

export const EntryExitTable = () => {
  const [entryexits, setEntryExits] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getEntryExits = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get(
        `/entryExit?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setEntryExits(res.data.data.content);
      setTotalCount(res.data.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEntryExits(1);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tên",
      dataIndex: "userName",
      render: (userName) => <span>{userName}</span>,
    },
    {
      title: "Tên cổng",
      dataIndex: "gate",
      render: (gate) => <span>{gate.name}</span>,
    },
    {
      title: "Thời gian ra vào",
      dataIndex: "date",
      render: (date) => <span>{formatDateTimeDetail(date)}</span>,
    },
    {
      title: "Yêu cầu vào",
      dataIndex: "visitorRequest",
      align: "center",
      render: (visitorRequest) => {
        let visitor = visitorRequest;
        let tagColor;
        switch (visitor) {
          case true:
            tagColor = "volcano";
            break;
          case false:
            tagColor = "green";
            break;
        }

        return (
          <Tag color={tagColor}>
            {visitorRequest === true ? "Khách" : "Dân cư"}
          </Tag>
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={entryexits}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getEntryExits(page);
        },
      }}
    />
  );
};
