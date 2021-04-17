import React from 'react';
// import { Button } from 'antd';
import { useRootStore } from '@mobx/useRootStore';
import { observer } from 'mobx-react';
// import { Switch } from 'react-router-dom';
// import PrivateRoute from '@components/PrivateRoute';
import { Table } from 'antd';
import './index.less';

function Dashboard() {
    const { dashboardStore } = useRootStore();

    React.useEffect(() => {
        dashboardStore.getTable();
    }, []);

    // const RouteWithSubRoutes = route => <PrivateRoute path={route.path} component={route.component} routes={route.routes} />;

    // const routeConfig = this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
    return (
        <section className="dashboard">
            <OrderTable
                list={dashboardStore.list}
                isLoading={dashboardStore.isLoading.get('getTable')}
            />
            {/* <Button onClick={() => this.props.history.push('/dashboard/bus')}>二级路由</Button> */}
            {/* <Switch>
                {routeConfig}
            </Switch> */}
        </section>
    );
}

export default observer(Dashboard);

// 表格列配置
const columns = [
    {
        title: '订单编号444',
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
    return <Table columns={columns} dataSource={list || []} loading={isLoading} rowKey="orderId" />;
}
