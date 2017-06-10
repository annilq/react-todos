import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import { Form, Icon, Input, Button } from "antd";
import Notify from "../util/notify";
import Request from "../util/request";
const FormItem = Form.Item;

class Register extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Request.post("/register", values).then(function(data) {
          browserHistory.replace("/login");
          Notify("success", "注册成功");
        });
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
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [{ required: true, type: "email", message: "请输入邮箱" }]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                type="email"
                placeholder="邮箱"
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
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="form-button">
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
