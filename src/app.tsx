import React from 'react';
import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { configure } from 'mobx';
import intl from 'react-intl-universal';
import dayjs from 'dayjs';
import zh_CN from 'antd/locale/zh_CN';
import en_US from 'antd/locale/en_US';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import ErrorBoundary from '@components/ErrorBoundary/index';
import Home from '@pages/home/index';
import Login from '@pages/user/login';
import Event from '@utils/event';
import '@mock/mock.ts';
import enUSJSON from '@locales/en_US.json';
import znCNJSON from '@locales/zh_CN.json';
import './styles/index.less';

const history = createHashHistory();

configure({ enforceActions: 'observed' });

const locales = {
    // error：vite require is nodefined
    // en_US: require('@locales/en_US.json'),
    // zh_CN: require('@locales/zh_CN.json')
    en_US: enUSJSON,
    zh_CN: znCNJSON
};

Sentry.init({ dsn: 'https://11f12914dc114782b37d9d94c8839a40@o414598.ingest.sentry.io/5304319' });

interface IProps {
    test?: string;
}

interface IState {
    antdLang: string | boolean;
}

export default class App extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            antdLang: 'zh_CN'
        };
    }

    componentDidMount(): any {
        this.loadLocales();
        Event.on('changeLanguage', (obj: any) => {
            dayjs.locale(obj.args === 'zh_CN' ? 'zh-cn' : 'en-us');
            this.loadLocales(obj.args);
        });
    }

    loadLocales(lang = 'zh_CN') {
        intl.init({
            currentLocale: lang,
            locales
        }).then(() => this.setState({ antdLang: lang === 'zh_CN' }));
    }

    render() {
        return (
            <ConfigProvider locale={this.state.antdLang ? zh_CN : en_US}>
                <Router history={history}>
                    <Switch>
                        {/* exact 用于强制跳转，未授权的用户，访问 login 页面 <Route path="/user/login" exact component={Login} /> */}
                        <Route path="/user/login" component={Login} />
                        <Sentry.ErrorBoundary fallback={ErrorBoundary} showDialog>
                            <Home />
                        </Sentry.ErrorBoundary>
                    </Switch>
                </Router>
            </ConfigProvider>
        );
    }
}
