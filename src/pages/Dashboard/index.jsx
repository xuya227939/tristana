import React, { Component } from 'react';
// import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { Table } from 'antd';
import './index.less';

@inject('dashboardStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dashboardStore } = this.props;
        dashboardStore.getTable();
    }

    render() {
        const { dashboardStore: { list }, dashboardStore } = this.props;
        const RouteWithSubRoutes = route => <PrivateRoute path={route.path} component={route.component} routes={route.routes} />;

        const routeConfig = this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
        return (
            <section className="dashboard">
                <OrderTable list={list} isLoading={dashboardStore.isLoading.get('getTable')} />
                {/* <Button onClick={() => this.props.history.push('/dashboard/bus')}>二级路由</Button> */}
                <Switch>
                    {routeConfig}
                </Switch>
            </section>
        );
    }
}

// 表格列配置
const columns = [
    {
        title: '订单编号',
        dataIndex: 'orderId'
    },
    {
        title: '客户名称',
        dataIndex: 'customerName'
    },
    {
        title: '下单方式',
        dataIndex: 'placeOrder'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName'
    },
    {
        title: '价格',
        dataIndex: 'price'
    },
    {
        title: '下单时间',
        dataIndex: 'placeOrderTime'
    }
];

// 订单表格
function OrderTable({ list, isLoading }) {
    return (
        <Table
            columns={columns}
            dataSource={list || []}
            loading={isLoading}
            rowKey="orderId"
        />
    );
}

export default Index;