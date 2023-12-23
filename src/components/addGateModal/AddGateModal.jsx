import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const AddGateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [form] = Form.useForm();

  const addNewGate = async (values) => {
    try {
      const { name, category } = values;
      // Nếu không có phòng, thực hiện đăng ký mà không cần thêm vào phòng
      const res = await userRequest.post("/gate", {
        name: name,
        category: category,
      });

      if (res.data.type === "success") {
        message.success("Thêm cổng thành công");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    addNewGate(values.gate);
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
          form={form}
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
              Thêm cổng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddGateModal;
