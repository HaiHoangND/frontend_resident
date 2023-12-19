import React, { useState } from "react";
import "./login.scss";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { publicRequest } from "../../requestMethods";

export const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const onFinish = async () => {
    const res = await publicRequest.post(`/authenticate`, user);
    if (res.data.type === "failed") {
      return message.error(res.data.message);
    } else {
      // console.log(res.data)
      signIn({
        token: res.data.access_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          id: res.data.id,
          role: res.data.role,
          phone: res.data.phone,
          username: res.data.userName,
          gate: res.data.gate,
          gender: res.data.gender,
        },
      });
      if (res.data.role === "ADMIN") return navigate("/member");
      else if (res.data.role === "GATEKEEPER") return navigate("/check-info");
      // return true;
    }
  };
  return (
    <div className="loginContainer">
      <img
        src="https://soict.hust.edu.vn/wp-content/uploads/logo-soict-hust-1.png"
        alt=""
      />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input
            style={{ height: 45, fontSize: 20 }}
            prefix={
              <PhoneOutlined
                className="site-form-item-icon"
                style={{ fontSize: 20 }}
              />
            }
            placeholder="Phone"
            onChange={onInputChange}
            name="phone"
            value={user.phone}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            style={{ height: 45, fontSize: 20 }}
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ fontSize: 20 }}
              />
            }
            type="password"
            placeholder="Password"
            onChange={onInputChange}
            name="password"
            value={user.password}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ fontSize: 20 }}>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="" style={{ fontSize: 20 }}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ fontSize: 20, height: 45 }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
