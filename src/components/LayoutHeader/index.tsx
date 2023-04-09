import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Dropdown, Tag } from 'antd';
import type { MenuProps } from 'antd';
import intl from 'react-intl-universal';
import Event from '@utils/event';
import './index.less';

interface IProps {
    history: any;
}

interface IState {
    lang: string;
}

class Index extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = { lang: 'zh_CN' };
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        const { history } = this.props;
        localStorage.token = '';
        history.replace('/user/login');
    }

    changeIntl = () => {
        Event.emit('changeLanguage', this.state.lang === 'zh_CN' ? 'en_US' : 'zh_CN');
        this.setState({ lang: this.state.lang === 'zh_CN' ? 'en_US' : 'zh_CN' });
    };

    render() {
        const items: MenuProps['items'] = [
            {
                label: (
                    <a href="null" target="_blank" rel="noopener noreferrer" onClick={this.signOut}>
                        退出
                    </a>
                ),
                key: 'out'
            }
        ];

        const items2: MenuProps['items'] = [
            {
                key: '1',
                label: '消息1',
                disabled: true
            },
            {
                key: '2',
                danger: true,
                label: '消息2'
            }
        ];

        return (
            <section className="layoutHeader">
                <div className="headeLeft">{intl.get('ORDER-SYSTEM')}</div>
                <div className="headerRight">
                    <Tag className="intl" color="#55acee" onClick={this.changeIntl}>
                        {this.state.lang === 'zh_CN' ? '中文' : 'English'}
                    </Tag>
                    <Dropdown menu={{ items: items2 }} trigger={['click']}>
                        <span onClick={e => e.preventDefault()} className="message">
                            {intl.get('MESSAGE')}
                        </span>
                    </Dropdown>
                    <Dropdown className="dropDown" menu={{ items }} trigger={['click']}>
                        <div>
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                className="avatar"
                                size={32}
                            />
                            <span className="name">{intl.get('MY')}</span>
                        </div>
                    </Dropdown>
                </div>
            </section>
        );
    }
}

export default withRouter(Index);
