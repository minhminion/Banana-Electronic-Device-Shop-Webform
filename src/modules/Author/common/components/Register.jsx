import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Radio, notification, Alert } from "antd";
import { useHistory } from "react-router-dom";

const tailLayout = {
  wrapperCol: { offset: 7, span: 15 },
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Vui lòng chọn ngày sinh!",
    },
  ],
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Đăng ký thành công",
    description: "Bạn hãy đăng nhập để thỏa sức mua sắm. ",
  });
};

const Register = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState()
  const history = useHistory();
  const { registerAccount } = props;

  const onFinish = async (values) => {
    if(registerAccount) {
      setError("")
      const result = await registerAccount(values);
      console.log('======== Bao Minh ~ file: Register.jsx ~ line 37 ~ onFinish ~ result', result)
      if (!result) {
        setError(error)
      } else {
        openNotificationWithIcon("success");
        history.push("/");
      }
    }
  }

  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      {error && (
        <Alert className="mb-3" message={error} type="error" />
      )}
      <Form.Item
        name="lastName"
        label={<span>Họ</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập họ" />
      </Form.Item>

      <Form.Item
        name="firstName"
        label={<span>Tên</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập tên" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại của bạn!",
          },
          {
            pattern: new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "E-mail không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập e-mail!",
          },
        ]}
      >
        <Input placeholder="Nhập e-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
          {
            min: 8,
            message: "Mật khẩu từ 8 ký tự trở lên",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Mật khẩu từ 8 ký tự trở lên" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu của bạn!",
          },

          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("Hai mật khẩu mà bạn đã nhập không khớp!");
            },
          }),
        ]}
      >
        <Input.Password placeholder="Xác nhận mật khẩu" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
