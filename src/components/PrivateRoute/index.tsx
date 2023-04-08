/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * 私有路由页面
 * @Author: Jiang
 * @Date: 2020-03-11 21:42:00
 * @Last Modified by: Jiang
 * @Last Modified time: 2023-04-07 23:23:07
 */

import React, { lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

const Error = lazy(() => import(/* webpackChunkName: "Error"*/ '@pages/user/error'));

interface IProps {
    // history: {
    //     replace(url: string): void;
    // };
    routes?(): void;
    path?: string;
    exact?: boolean;
    strict?: boolean;
    component?: any;
}

interface IState {
    isAuthenticated: boolean;
}

class PrivateRoute extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: true };
    }

    componentDidMount() {
        // let isAuthenticated = localStorage.token ? true : false;
        // this.setState({ isAuthenticated });
        // if (!isAuthenticated) {
        //     const { history } = this.props;
        //     setTimeout(() => {
        //         history.replace('/user/login');
        //     }, 1000);
        // }
    }

    render() {
        const { component: Component, path = '/', exact = false, strict = false } = this.props;
        return this.state.isAuthenticated ? (
            <Route
                path={path}
                exact={exact}
                strict={strict}
                render={props => {
                    return <Component {...props} routes={this.props.routes} />;
                }}
            />
        ) : (
            <Error />
        );
    }
}

export default withRouter(PrivateRoute);
