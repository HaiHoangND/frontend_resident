import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const UpdateGateModal = ({ gate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: gate.name,
    category: gate.category,
  });

  const updateGate = async (values) => {
    try {
      const { name, category } = values;
      const res = await userRequest.put(`/gate/${gate.id}`, {
        name: name,
        category: category,
      });
      if (res.data.type === "success") {
        message.success("Cập nhật cổng thành công");
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    updateGate(values.gate);
    setFormData(values.gate);
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                fontSize: 20,
                height: 45,
                display: "block",
                margin: "auto",
              }}
            >
              Cập nhật cổng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGateModal;
