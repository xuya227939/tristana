/*
 * 路由权限配置页面
 * @Date: 2019-07-18 10:33:21
 */
import React, { Component } from 'react';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    AreaChartOutlined,
    // ApiOutlined,
    CloudUploadOutlined,
    FileTextOutlined,
    PrinterOutlined,
    ColumnWidthOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface IProps {
    location: any;
    history: any;
}

interface IState {
    selectedKeys: any;
    pathname: string;
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem;
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

    onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
    };

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
            // {
            //     label: <span>路由</span>,
            //     key: '/routerTest',
            //     icon: <ApiOutlined />
            // },
            getItem('图表', 'sub1', <AreaChartOutlined />, [
                getItem('图表1', '/charts'),
                getItem('图表2', '/charts2'),
                getItem('图表3', '/charts3')
            ]),
            {
                label: <span>拖拽</span>,
                key: '/dnd',
                icon: <ColumnWidthOutlined />
            },
            {
                label: <span>文件上传</span>,
                key: '/upload',
                icon: <CloudUploadOutlined />
            },
            {
                label: <span>水印</span>,
                key: '/watermark',
                icon: <PrinterOutlined />
            },
            {
                label: <span>富文本编辑</span>,
                key: '/quill',
                icon: <FileTextOutlined />
            },
            {
                label: <span>404</span>,
                key: '/user/error',
                icon: <SmileOutlined />
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
