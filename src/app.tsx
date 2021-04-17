import React from 'react';
import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import { configure } from 'mobx';
import intl from 'react-intl-universal';
import dayjs from 'dayjs';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
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

interface IProps {}

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

    componentDidMount() {
        this.loadLocales();
        Event.on('changeLanguage', (obj: any) => {
            dayjs.locale(obj.args == 'zh_CN' ? 'zh-cn' : 'en-us');
            this.loadLocales(obj.args);
        });
    }

    loadLocales(lang = 'zh_CN') {
        intl.init({
            currentLocale: lang,
            locales
        }).then(() => this.setState({ antdLang: lang == 'zh_CN' }));
    }

    render() {
        return (
            <ConfigProvider locale={this.state.antdLang ? zh_CN : en_US}>
                <Router history={history}>
                    <Switch>
                        <Route path="/user/login" exact component={Login} />
                        <ErrorBoundary>
                            <Home />
                        </ErrorBoundary>
                    </Switch>
                </Router>
            </ConfigProvider>
        );
    }
}
