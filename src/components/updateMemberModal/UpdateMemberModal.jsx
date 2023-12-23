import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Space, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { userRequest } from "../../requestMethods";

const UpdateMemberModal = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [building, setBuilding] = useState(null);
  const initialRoomsData = user.rooms.map((room) => ({
    room: room.number,
    building: room.building.id,
  }));

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

  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    phone: user.phone,
    rooms: initialRoomsData, // Dùng một mảng để lưu thông tin các phòng
    status: user.status,
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
    updateUser(values.user);
    setFormData(values.user);
    console.log(values.user);
  };

  const updateUser = async (values) => {
    try {
      const { name, gender, phone, rooms, status } = values;
      const roomExistResults = [];

      for (const roomItem of rooms) {
        const isRoomExist = await checkExistRoomByRoomNumberAndBuildingId(
          roomItem.room,
          roomItem.building
        );
        roomExistResults.push(isRoomExist);
      }
      if (roomExistResults.includes(null)) {
        message.error("Có ít nhất một phòng không tồn tại");
        // Thực hiện hành động khác ở đây khi có phòng không tồn tại
      } else {
        const newRoomList = roomExistResults.map((id) => ({ id }));
        const res = await userRequest.put(`/user/${user.id}`, {
          name: name,
          phone: phone,
          status: status,
          gender: gender,
          role: "MEMBER",
          gateId: 1,
          rooms: newRoomList,
        });
        if (res.data.type === "success") {
          message.success("Cập nhật cư dân thành công");
        } else {
          message.error(res.data.message);
        }
      }
    } catch (e) {
      console.log(e);
    }
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
            <Select defaultValue={user.gender}>
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
          <Form.Item name={["user", "status"]} label="Trạng thái">
            <Select defaultValue={user.status}>
              <Select.Option value={true}>Đang sinh sống</Select.Option>
              <Select.Option value={false}>Đã rời đi</Select.Option>
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
              Cập nhật cư dân
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateMemberModal;
