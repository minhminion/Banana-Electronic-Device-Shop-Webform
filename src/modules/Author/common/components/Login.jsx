import React from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
  const { loginAccount, error, loading } = props;

  const onFinish = async (values) => {
    console.log("Success:", values);
    loginAccount && (await loginAccount(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {error?.ApiErr && !loading && (
        <Alert className="mb-3" message={error.ApiErr} type="error" />
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          {
            pattern: /^.+@.+$/,
            message: "Email không hợp lệ",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập password" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
