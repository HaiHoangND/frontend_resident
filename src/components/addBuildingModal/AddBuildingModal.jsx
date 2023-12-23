import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const AddBuildingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
  });

  const addNewBuilding = async (values) => {
    try {
      const { name, position } = values;
      const res = await userRequest.post("/building", {
        name: name,
        position: position,
      });
      if (res.data.type === "success") {
        message.success("Thêm tòa nhà thành công");
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
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
    addNewBuilding(values.building);
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
          form={form}
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
              Thêm tòa nhà
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBuildingModal;
