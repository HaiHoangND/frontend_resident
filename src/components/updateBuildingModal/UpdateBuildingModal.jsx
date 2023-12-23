import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const UpdateBuildingModal = ({ building }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: building.name,
    position: building.position,
  });

  const updateBuilding = async (values) => {
    try {
      const { name, position } = values;
      const res = await userRequest.put(`/building/${building.id}`, {
        name: name,
        position: position,
      });
      if (res.data.type === "success") {
        message.success("Cập nhật tòa nhà thành công");
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
    updateBuilding(values.building);
    setFormData(values.building);
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
              Cập nhật tòa nhà
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateBuildingModal;
