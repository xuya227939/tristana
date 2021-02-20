/*
 * 路由权限配置页面
 * @Date: 2019-07-18 10:33:21
 */
import React, { Component } from 'react';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';

interface IProps {
    location: any;
    history: any;
}

interface IState {
    selectedKeys: any;
    pathname: string;
}

class Index extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['/dashboard'],
            // 当前页面路径
            pathname: ''
        };
    }

    componentDidMount() {
        const {
            location: { pathname }
        } = this.props;
        this.setState({
            selectedKeys: [pathname],
            pathname
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname != state.pathname) {
            return {
                pathname: props.location.pathname,
                selectedKeys: [props.location.pathname]
            };
        }
        return state;
    }

    render() {
        const { selectedKeys } = this.state;
        return (
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['/dashboard']}
                selectedKeys={selectedKeys}
                onClick={({ key }) => {
                    this.props.history.push(key);
                    this.setState({ selectedKeys: [key] });
                }}
            >
                <Menu.Item key="/dashboard">
                    <HomeOutlined />
                    <span>工作台</span>
                </Menu.Item>
                <Menu.Item key="/add/goods">
                    <ShoppingCartOutlined />
                    <span>添加商品</span>
                </Menu.Item>
                <Menu.Item key="/user/error">
                    <span>404</span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Index);
