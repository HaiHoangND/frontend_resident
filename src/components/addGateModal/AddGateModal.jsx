import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddGateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
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
      <Button
        type="primary"
        style={{ backgroundColor: "#176B87" }}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm mới cổng
      </Button>
      <Modal
        title="Thêm mới cổng"
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
            <Select>
              <Select.Option value="IN">Vào</Select.Option>
              <Select.Option value="OUT">Ra</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddGateModal;
