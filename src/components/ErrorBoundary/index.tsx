/*
 * 错误捕获组件
 * @Author: Jiang
 * @Date: 2019-06-12 15:21:19
 * @Last Modified by: Jiang
 * @Last Modified time: 2023-04-07 21:26:47
 */
import React from 'react';
import { Result, Button } from 'antd';
import * as Sentry from '@sentry/react';

interface IProps {
    // eslint-disable-next-line no-undef
    children?: JSX.Element;
}

interface IState {
    hasError: boolean;
    info: string;
    eventId: string;
}

class ErrorBoundary extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false, info: '', eventId: '' };
    }

    static getDerivedStateFromError() {
        // 更新 state 使下一次渲染可以显示降级 UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({
            info: error + ''
        });
        const userId = Math.random().toString(36).substr(2, 9);
        Sentry.withScope(scope => {
            scope.setExtras(info.componentStack);
            scope.setUser({
                id: userId,
                username: 'testUser',
                ip_address: '',
                email: ''
            });
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        if (this.state.hasError) {
            // 你可以渲染任何自定义的降级 UI
            return (
                <Result
                    status="500"
                    title="500"
                    subTitle={this.state.info}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}
                        >
                            Report feedback
                        </Button>
                    }
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
