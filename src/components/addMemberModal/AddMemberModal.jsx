import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { publicRequest, userRequest } from "../../requestMethods";

const AddMemberModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [building, setBuilding] = useState(null);
  const [form] = Form.useForm();
  const getBuildings = async () => {
    try {
      const res = await userRequest.get("/building/all");
      setBuilding(res.data.data);
    } catch (e) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBuildings();
  }, []);

  const checkExistRoomByRoomNumberAndBuildingId = async (
    roomNumber,
    buildingId
  ) => {
    try {
      const res = await userRequest.get(
        `/room/findByRoomNumber?roomNumber=${roomNumber}&buildingId=${buildingId}`
      );
      return res.data.data;
    } catch (e) {
      console.log(error);
    }
  };

  const register = async (name, gender, phone) => {
    try {
      const res = await publicRequest.post("/register", {
        name: name,
        password: "123",
        phone: phone,
        status: true,
        gender: gender,
        role: "MEMBER",
        gateId: 1,
      });
      return res;
    } catch (e) {
      console.log(error);
    }
  };

  const addNewUser = async (values) => {
    try {
      const { name, gender, phone, rooms } = values;

      // Kiểm tra xem có phòng nào được thêm không
      if (rooms === undefined) {
        // Nếu không có phòng, thực hiện đăng ký mà không cần thêm vào phòng
        const res = await register(name, gender, phone);

        if (res.data.type === "success") {
          message.success("Thêm cư dân thành công");
        } else {
          message.error(res.data.message);
        }
      } else {
        // Kiểm tra sự tồn tại của phòng nếu có phòng được thêm
        const roomExistResults = [];

        for (const roomItem of rooms) {
          const isRoomExist = await checkExistRoomByRoomNumberAndBuildingId(
            roomItem.room,
            roomItem.building
          );
          roomExistResults.push(isRoomExist);
        }
        console.log(roomExistResults);
        // Nếu có ít nhất một phòng không tồn tại, hiển thị thông báo hoặc thực hiện hành động phù hợp
        if (roomExistResults.includes(null)) {
          message.error("Có ít nhất một phòng không tồn tại");
          // Thực hiện hành động khác ở đây khi có phòng không tồn tại
        } else {
          // Tất cả các phòng đều tồn tại, thực hiện hành động cần thiết
          const res = await register(name, gender, phone);

          if (res.data.type === "success") {
            // Thêm người dân vào các phòng
            roomExistResults.map(async (roomId) => {
              const res1 = await userRequest.post(
                `/room/addUser?userId=${res.data.data.id}&roomId=${roomId}`
              );
            });
            message.success("Thêm cư dân thành công");
          } else {
            message.error(res.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    addNewUser(values);
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
        <Form form={form} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phòng">
            <Form.List name="rooms">
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
                      <Form.Item
                        style={{
                          width: 90,
                          margin: "auto",
                        }}
                        name={[subField.name, "room"]}
                      >
                        <Input placeholder="Phòng" />
                      </Form.Item>
                      <Form.Item
                        style={{
                          width: 200,
                          margin: "auto",
                        }}
                        name={[subField.name, "building"]}
                      >
                        <Select>
                          {building &&
                            building.map((buildingItem) => (
                              <Select.Option
                                key={buildingItem.id}
                                value={buildingItem.id}
                              >
                                {buildingItem.name}
                              </Select.Option>
                            ))}
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
              Thêm cư dân
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddMemberModal;
