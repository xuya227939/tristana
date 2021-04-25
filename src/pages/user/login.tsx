/*
 * 登录页面
 * @Author: Jiang
 * @Date: 2019-06-13 16:45:59
 * @Last Modified by: Jiang
 * @Last Modified time: 2021-04-17 15:56:06
 */

import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/lib/style/index.css';
import './login.less';

interface IProps {
    history: {
        push(url: string): void;
    };
}

class Login extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 表单提交
    handleSubmit = values => {
        const { history } = this.props;
        console.log('Success:', values);
        localStorage.token = 'login';
        history.push('/dashboard');
    };

    render() {
        return (
            <main className="login">
                <Form onFinish={this.handleSubmit} className="login-form">
                    <Form.Item
                        name="loginName"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号'
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            size="large"
                            addonBefore="账号"
                            placeholder="请输入账号"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            size="large"
                            type="password"
                            addonBefore="密码"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item name="remember">
                        <article className="login-form-remember">
                            <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </article>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button login-btn"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <article className="register">
                            Or&nbsp;<a href="">register now!</a>
                        </article>
                    </Form.Item>
                </Form>
            </main>
        );
    }
}

export default Login;
