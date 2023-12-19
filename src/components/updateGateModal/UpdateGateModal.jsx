import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UpdateGateModal = ({ gate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: gate.name,
    category: gate.category,
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
    setFormData(values.gate);
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
          initialValues={{ gate: formData }}
        >
          <Form.Item
            name={["gate", "name"]}
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={["gate", "category"]} label="Loại cổng">
            <Select defaultValue={gate.category}>
              <Select.Option value="IN">Vào</Select.Option>
              <Select.Option value="OUT">Ra</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGateModal;
