import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { publicRequest, userRequest } from "../../requestMethods";

const AddGateKeeperModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gate, setGate] = useState(null);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    gate: "",
    status: "",
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

  const register = async (name, gender, phone, gateId) => {
    try {
      const res = await publicRequest.post("/register", {
        name: name,
        password: "123",
        phone: phone,
        status: true,
        gender: gender,
        role: "GATEKEEPER",
        gateId: gateId,
      });
      return res;
    } catch (e) {
      console.log(error);
    }
  };

  const addNewUser = async (values) => {
    try {
      const { name, gender, phone, gate } = values;
      // Nếu không có phòng, thực hiện đăng ký mà không cần thêm vào phòng
      const res = await register(name, gender, phone, gate);

      if (res.data.type === "success") {
        message.success("Thêm bảo vệ thành công");
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
    console.log(values.user);
    addNewUser(values.user);
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
          form={form}
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
              Thêm bảo vệ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddGateKeeperModal;
