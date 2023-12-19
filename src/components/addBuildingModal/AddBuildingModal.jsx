import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddBuildingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
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
      <Button
        type="primary"
        style={{ backgroundColor: "#176B87" }}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm mới tòa nhà
      </Button>
      <Modal
        title="Thêm mới tòa nhà"
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

export default AddBuildingModal;
