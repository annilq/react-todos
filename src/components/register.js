import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import { Form, Icon, Input, Button } from "antd";
const FormItem = Form.Item;

class Register extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        localStorage.setItem("TOKEN", "TOKEN");
        browserHistory.replace("/");
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="register-wrapper form-wrapper">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <div className="app-title">react-todos</div>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, type: "email", message: "请输入用户名" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入邮箱" }]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                type="email"
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="form-button"
            >
              注册
            </Button>
            <Link to="/login">返回登录</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegister = Form.create()(Register);
export default WrappedRegister;
