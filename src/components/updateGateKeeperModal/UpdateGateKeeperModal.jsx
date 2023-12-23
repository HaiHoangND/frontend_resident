import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const UpdateGateKeeperModal = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gate, setGate] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    phone: user.phone,
    gate: user.gate.id,
    status: user.status,
  });

  const getGates = async () => {
    try {
      const res = await userRequest.get("/gate/all");
      setGate(res.data.data);
    } catch (e) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGates();
  }, []);

  const updateUser = async (values) => {
    try {
      const { name, gender, phone, gate, status } = values;
      const res = await userRequest.put(`/user/${user.id}`, {
        name: name,
        phone: phone,
        status: status,
        gender: gender,
        role: "GATEKEEPER",
        gateId: gate,
      });
      if (res.data.type === "success") {
        message.success("Cập nhật bảo vệ thành công");
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    updateUser(values.user);
    setFormData(values.user);
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
              {gate &&
                gate.map((gateItem) => (
                  <Select.Option key={gateItem.id} value={gateItem.id}>
                    {gateItem.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name={["user", "status"]} label="Trạng thái">
            <Select defaultValue={user.status}>
              <Select.Option value={true}>Đang làm việc</Select.Option>
              <Select.Option value={false}>Đã nghỉ việc</Select.Option>
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
              Cập nhật bảo vệ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGateKeeperModal;
