import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";

const AddMemberModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    rooms: [{ room: "", building: "" }],
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
        Thêm mới dân cư
      </Button>
      <Modal
        title="Thêm mới dân cư"
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
          {/* <Form.Item
            name={["user", "room"]}
            label="Số phòng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "building"]} label="Tòa nhà">
            <Select>
              <Select.Option value="Tòa nhà Sunrise">
                Tòa nhà Sunrise
              </Select.Option>
              <Select.Option value="Tòa nhà Sun Tower">
                Tòa nhà Sun Tower
              </Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="Phòng">
            <Form.List name={["user", "rooms"]}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField) => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, "room"]}>
                        <Input placeholder="Phòng" />
                      </Form.Item>
                      <Form.Item noStyle name={[subField.name, "building"]}>
                        <Select>
                          <Select.Option value="Tòa nhà Sunrise">
                            Tòa nhà Sunrise
                          </Select.Option>
                          <Select.Option value="Tòa nhà Sun Tower">
                            Tòa nhà Sun Tower
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => subOpt.add({ room: "", building: "" })}
                    block
                  >
                    + Thêm phòng
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddMemberModal;
