import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";

const UpdateMemberModal = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialRoomsData = user.rooms.map((room) => ({
    room: room.number,
    building: room.building.name,
  }));

  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    phone: user.phone,
    rooms: initialRoomsData, // Dùng một mảng để lưu thông tin các phòng
    status: user.status ? "true" : "false",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Thực hiện xử lý cập nhật dữ liệu ở đây (formData chứa dữ liệu mới)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    // Lấy dữ liệu từ form và cập nhật vào formData
    setFormData(values.user);
    handleOk();
  };

  return (
    <>
      <EditOutlined type="primary" onClick={showModal} />
      <Modal
        title="Cập nhật thông tin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="nest-messages"
          onFinish={onFinish}
          initialValues={{ user: formData }}
        >
          <Form.Item
            name={["user", "name"]}
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "gender"]} label="Giới tính">
            <Select defaultValue={user.gender}>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["user", "phone"]}
            label="Số điện thoại"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phòng">
            <Form.List name={["user", "rooms"]}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField) => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, "room"]}>
                        <Input placeholder="Phòng" />
                      </Form.Item>
                      <Form.Item noStyle name={[subField.name, "building"]}>
                        <Select>
                          <Select.Option value="Tòa nhà Sunrise">
                            Tòa nhà Sunrise
                          </Select.Option>
                          <Select.Option value="Tòa nhà Sun Tower">
                            Tòa nhà Sun Tower
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => subOpt.add({ room: "", building: "" })}
                    block
                  >
                    + Thêm phòng
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item name={["user", "status"]} label="Trạng thái">
            <Select defaultValue={user.status ? "true" : "false"}>
              <Select.Option value="true">Đang sinh sống</Select.Option>
              <Select.Option value="false">Đã rời đi</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateMemberModal;
