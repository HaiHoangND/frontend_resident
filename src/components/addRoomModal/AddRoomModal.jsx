import React, { useRef, useState } from "react";
import { Modal, Form, Input, Select, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { UploadOutlined } from "@ant-design/icons";

const AddRoomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uploadRef = useRef();
  const [imgFile, setImgFile] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
    image: "",
    buildingId: "",
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
      <Button
        type="primary"
        style={{ backgroundColor: "#176B87" }}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Thêm mới phòng
      </Button>
      <Modal
        title="Thêm mới phòng"
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

export default AddRoomModal;
