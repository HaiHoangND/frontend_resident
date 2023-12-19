import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UpdateGateKeeperModal = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    phone: user.phone,
    gate: user.gate.name,
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
            <Select>
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
          <Form.Item name={["user", "gate"]} label="Tên cổng">
            <Select>
              <Select.Option value="Cổng chính">Cổng chính</Select.Option>
              <Select.Option value="Cổng ra số 1">Cổng ra số 1</Select.Option>
              <Select.Option value="Cổng phụ tầng 2">
                Cổng phụ tầng 2
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={["user", "status"]} label="Trạng thái">
            <Select defaultValue={user.status ? "true" : "false"}>
              <Select.Option value="true">Đang làm việc</Select.Option>
              <Select.Option value="false">Đã nghỉ việc</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGateKeeperModal;
