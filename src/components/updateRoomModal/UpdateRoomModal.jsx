import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { UploadOutlined } from "@ant-design/icons";

const UpdateRoomModal = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uploadRef = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [defaultFileList, setDefaultFileList] = useState([]);
  useEffect(() => {
    if (room.image) {
      const defaultFile = {
        uid: v4(), 
        name: "Room Image", 
        status: "done", 
        url: room.image, 
      };
      setDefaultFileList([defaultFile]);
    }
  }, [room.image]);
  const [formData, setFormData] = useState({
    number: room.number,
    image: room.image,
    buildingId: room.building.name,
  });

  const handleUploadImg = async () => {
    if (!imgFile) return;
    const imgRef = ref(storage, `images/${imgFile.name + v4()}`);
    await uploadBytes(imgRef, imgFile);
    const uploadedImgURL = await getDownloadURL(imgRef);
    return uploadedImgURL;
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
    // Lấy dữ liệu từ form và cập nhật vào formData
    setFormData(values.room);
    handleOk();
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
          initialValues={{ room: formData }}
        >
          <Form.Item
            name={["room", "number"]}
            label="Số phòng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["room", "buildingId"]} label="Tòa nhà">
            <Select>
              <Select.Option value="1">Tòa nhà Sunrise</Select.Option>
              <Select.Option value="2">Tòa nhà Sun Tower</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              defaultFileList={defaultFileList}
              ref={uploadRef}
              listType="picture"
              maxCount={1}
              beforeUpload={(file) => {
                setImgFile(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />} type="primary">
                Chọn hình ảnh phòng
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateRoomModal;
