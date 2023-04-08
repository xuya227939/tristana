/*
 * 路由权限配置页面
 * @Date: 2019-07-18 10:33:21
 */
import React, { Component } from 'react';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    AreaChartOutlined,
    ApiOutlined,
    CloudUploadOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

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
        if (props.location.pathname !== state.pathname) {
            return {
                pathname: props.location.pathname,
                selectedKeys: [props.location.pathname]
            };
        }
        return state;
    }

    render() {
        const { selectedKeys } = this.state;

        const items: MenuProps['items'] = [
            {
                label: <span>工作台</span>,
                key: '/dashboard',
                icon: <HomeOutlined />
            },
            {
                label: <span>表单验证</span>,
                key: '/add/goods',
                icon: <ShoppingCartOutlined />
            },
            {
                label: <span>路由</span>,
                key: '/routerTest',
                icon: <ApiOutlined />
            },
            {
                label: <span>图表</span>,
                key: '/charts',
                icon: <AreaChartOutlined />
            },
            {
                label: <span>拖拽 + 文件上传</span>,
                key: '/dnd',
                icon: <CloudUploadOutlined />
            },
            {
                label: <span>富文本编辑</span>,
                key: '/quill',
                icon: <FileTextOutlined />
            },
            {
                label: <span>404</span>,
                key: '/user/error',
                icon: <HomeOutlined />
            }
        ];

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
                items={items}
            />
        );
    }
}

export default withRouter(Index);
