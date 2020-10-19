// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from '@components/PrivateRoute/index';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard"*/'@pages/Dashboard/index'));
const Bus = lazy(() => import(/* webpackChunkName: "Bus"*/'@pages/Bus/index'));
const AddGoods = lazy(() => import(/* webpackChunkName: "AddGoods"*/'@pages/AddGoods/index'));
const Counter = lazy(() => import(/* webpackChunkName: "Counter"*/'@pages/Counter/index'));
const Login = lazy(() => import(/* webpackChunkName: "Login"*/'@pages/User/login'));
const Error = lazy(() => import(/* webpackChunkName: "Error"*/'@pages/User/error'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage"*/'@pages/Error/index'));
const Hook = lazy(() => import(/* webpackChunkName: "Hook"*/'@pages/Hook/index'));

const routes = [
    {
        // 登录页
        path: '/user/login',
        component: Login
    },
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
        // 添加商品页
        path: '/add/goods',
        component: AddGoods
    },
    {
        // 计数器页
        path: '/counter',
        component: Counter
    },
    {
        // 权限或者404页面
        path: '/error',
        component: Error
    },
    {
        // 错误页面
        path: '/errorPage',
        component: ErrorPage
    },
    {
        // hook
        path: '/hook',
        component: Hook
    }
];

const RouteWithSubRoutes = route => <PrivateRoute path={route.path} component={route.component} routes={route.routes} />;

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
