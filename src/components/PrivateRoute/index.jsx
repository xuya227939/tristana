/*
 * 私有路由页面
 * @Author: Jiang
 * @Date: 2020-03-11 21:42:00
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-08-25 17:42:30
 */

import React, { lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Error = lazy(() => import(/* webpackChunkName: "Error"*/'@pages/User/error'));

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: true };
    }

    componentDidMount() {
        let isAuthenticated = localStorage.token ? true : false;
        this.setState({ isAuthenticated });

        if (!isAuthenticated) {
            const { history } = this.props;
            setTimeout(() => {
                history.replace('/user/login');
            }, 1000);
        }
    }

    render() {
        let { component: Component, path = '/', exact = false, strict = false } = this.props;
        return this.state.isAuthenticated ? (
            <Route
                path={path}
                exact={exact}
                strict={strict} render={(props) => (<Component {...props} routes={this.props.routes} />)}
            />
        ) : <Error />;
    }
}

PrivateRoute.propTypes = {
    // 路径
    path: PropTypes.string.isRequired,
    // exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜杠也是可以匹配上的。
    exact: PropTypes.bool,
    // strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的
    strict: PropTypes.bool
    // 页面组件
    // component: PropTypes.func.isRequired
};

export default withRouter(PrivateRoute);