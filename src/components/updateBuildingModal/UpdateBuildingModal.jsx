import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UpdateBuildingModal = ({ building }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: building.name,
    position: building.position,
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
    setFormData(values.building);
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
          initialValues={{ building: formData }}
        >
          <Form.Item
            name={["building", "name"]}
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["building", "position"]}
            label="Vị trí"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateBuildingModal;
