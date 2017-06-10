import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import { Form, Icon, Input, Button } from "antd";
import Notify from "../util/notify";
import Request from "../util/request";
const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Request.post("/login", values).then(function(data) {
          browserHistory.replace("/home");
          Notify("success", "登陆成功");
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper form-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="app-title">react-todos</div>
          <FormItem>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
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
              登录
            </Button>
            <Link to="/register">马上注册</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
