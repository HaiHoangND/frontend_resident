import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddGateKeeperModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    gate: "",
    status: "",
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
      <Button
        type="primary"
        style={{ backgroundColor: "#176B87" }}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm mới bảo vệ
      </Button>
      <Modal
        title="Thêm mới bảo vệ"
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
        </Form>
      </Modal>
    </>
  );
};

export default AddGateKeeperModal;
