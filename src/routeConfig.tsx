// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from '@components/PrivateRoute/index';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard"*/ '@/pages/dashboard'));
const Bus = lazy(() => import(/* webpackChunkName: "Bus"*/ '@/pages/bus/index'));
const AddGoods = lazy(() => import(/* webpackChunkName: "AddGoods"*/ '@/pages/addGoods'));
const Login = lazy(() => import(/* webpackChunkName: "Login"*/ '@/pages/user/login'));
const Error = lazy(() => import(/* webpackChunkName: "Error"*/ '@/pages/user/error'));
const RouterTest = lazy(() => import(/* webpackChunkName: "RouterTest"*/ '@/pages/routerTest'));
const RouterTestDetail = lazy(
    () => import(/* webpackChunkName: "RouterTestDetail"*/ '@/pages/routerTestDetail')
);
const Charts = lazy(() => import(/* webpackChunkName: "charts"*/ '@/pages/charts'));
const Dnd = lazy(() => import(/* webpackChunkName: "Dnd"*/ '@/pages/dnd'));
const Quill = lazy(() => import(/* webpackChunkName: "Quill"*/ '@/pages/quill'));

const routes = [
    {
        // 仪表盘页
        path: '/dashboard',
        component: Dashboard,
        routes: [
            {
                path: '/dashboard/bus',
                component: Bus
            }
        ]
    },
    {
        // 表单页
        path: '/add/goods',
        component: AddGoods
    },
    {
        // 图表页
        path: '/charts',
        component: Charts
    },
    {
        // 拖拽页
        path: '/dnd',
        component: Dnd
    },
    {
        // 富文本编辑
        path: '/quill',
        component: Quill
    },
    {
        // 路由页
        path: '/routerTest',
        component: RouterTest,
        routes: [
            {
                path: '/routerTest/routerTestDetail',
                component: RouterTestDetail
            }
        ]
    },
    {
        // 登录页
        path: '/user/login',
        component: Login,
        exact: true
    },
    {
        // 权限或者404页面
        path: '/user/error',
        component: Error
    }
];

const RouteWithSubRoutes = route => (
    <PrivateRoute
        path={route.path}
        component={route.component}
        exact={route.exact}
        routes={route.routes}
    />
);

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
