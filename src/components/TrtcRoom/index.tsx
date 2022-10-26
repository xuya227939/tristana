/* eslint-disable no-undef */
/*
 * TRTC集成WEBSDK，参考文档: https://trtc-1252463788.file.myqcloud.com/web/docs/tutorial-01-basic-video-call.html
 * @Author: Jiang
 * @Date: 2019-08-27 18:00:15
 * @Last Modified by: Jiang
 * @Last Modified time: 2022-10-26 11:54:17
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Popconfirm, Spin, Button } from 'antd';
import TRTC from 'trtc-js-sdk';
import request from '@/request';
import { isEmpty, formatSeconds, logger } from '@/utils';
import './index.less';

interface IProps {
    videoStore: any;
    onEvent: any;
}

interface IState {
    talkTime: any;
    imgStyle: any;
}

@inject('videoStore')
@observer
class TrtcRoom extends React.Component<IProps, IState> {
    isDown: any;
    sdkAppId: any;
    roomid: any;
    userSig: any;
    userId: any;
    shareUserId: any;
    customerCode: any;
    client: any;
    removeStream: any;
    requestId: any;
    localStream: any;
    startStream: any;
    remoteStream: any;
    id: any;
    first: any;
    shareClient: any;
    bytesReceived: any;
    timer: any;
    count: any;
    talkTime: any;
    currentX: any;
    currentY: any;
    offsetLeft: any;
    offsetTop: any;
    localTimer: any;
    remoteTimer: any;

    constructor(props) {
        super(props);
        this.state = {
            // 移动的时候，更改距离
            imgStyle: {},
            // 通话时长，以秒为单位
            talkTime: 0
        };
        // 是否按下
        this.isDown = false;
        // 初始化 开通实时音视频服务创建应用后分配的 sdkappid
        this.sdkAppId = '';
        // 房间号
        this.roomid = 0;
        // 身份签名，需要从自行搭建的签名服务获取
        this.userSig = '';
        // 用户id
        this.userId = '';
        // 共享屏幕id
        this.shareUserId = '';
        this.shareUserId = '';
        // 用户标识
        this.customerCode = '';
        this.client = '';
        // TRTC.Logger.setLogLevel(TRTC.Logger.LogLevel.TRACE);
        // 远端流
        this.removeStream = '';
        this.requestId = '';
        this.localStream = '';
        // 本地屏幕分享流
        this.startStream = '';
        this.remoteStream = '';
        this.id = '';
        this.first = true;
        // 屏幕共享 client
        this.shareClient = '';
        // 远端发送字节数
        this.bytesReceived = '';
        // 定时器
        this.timer = '';
        // 计时
        this.count = 0;
        // 通话时长
        this.talkTime = 0;
    }

    async componentDidUpdate() {
        const {
            videoStore: {
                videoInfo: {
                    sdkAppId,
                    agnetSig,
                    roomId,
                    agent,
                    shareUserId,
                    shareUserSig,
                    customerCode
                },
                videoInfo,
                isCallOn,
                requestId
            },
            videoStore
        } = this.props;
        // 如果有视频信息并接听
        if (!isEmpty(videoInfo) && isCallOn) {
            videoStore.isCallOn = false;
            videoStore.callOn();
            // 初始化 开通实时音视频服务创建应用后分配的 sdkappid
            this.sdkAppId = sdkAppId;
            // 房间号
            this.roomid = Number(roomId);
            // 身份签名，需要从自行搭建的签名服务获取
            this.userSig = agnetSig;
            // 用户id
            this.userId = agent;
            // 共享屏幕id
            this.shareUserId = shareUserId;
            this.shareUserId = shareUserSig;
            // 用户标识
            this.customerCode = customerCode;
            this.client = TRTC.createClient({
                mode: 'rtc',
                sdkAppId,
                userId: this.userId,
                userSig: this.userSig
            });

            // 远端流
            this.requestId = requestId;
            this.first = true;
            // 计时
            this.count = 0;
            // 暴力清除定时器
            for (let i = 0; i < 1000; i++) {
                this.timer && clearTimeout(this.timer);
            }
            for (let i = 0; i < 1000; i++) {
                this.timer && clearTimeout(this.talkTime);
            }
            this.setState({
                talkTime: 0
            });
            this.getLocalStream();
            this.onRemoteStreamUpdate();
            await this.enterRomm();
            await this.startRTC();
            await this.publish();
        }
    }

    // 图片按下事件
    handlerDown = e => {
        e.preventDefault();
        const modal: any = document.getElementById('modal-container');
        this.isDown = true;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
        this.offsetLeft = parseInt(modal.offsetLeft);
        this.offsetTop = parseInt(modal.offsetTop);
        this.handlerMove();
        // 移除事件
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            this.isDown = false;
        };
    };

    // 图片移动
    handlerMove = () => {
        document.onmousemove = e => {
            if (this.isDown) {
                const left = e.clientX - this.currentX + this.offsetLeft + 'px';
                const top = e.clientY - this.currentY + this.offsetTop + 'px';
                const style = {
                    left,
                    top
                };
                this.setState({
                    imgStyle: style
                });
            }
        };
    };

    // 加入或创建房间 在得到初始化的 WebRTCAPI 对象实例 RTC 后，调用对象实例的 enterRoom() 方法，即可进入房间（如果 roomid 不存在则为创建房间）
    enterRomm() {
        return new Promise((resolve, reject) => {
            this.client
                .join({ roomId: this.roomid })
                .catch(err => {
                    logger('error', 'enterRomm error：' + err);
                    reject(err);
                })
                .then(res => {
                    logger('log', 'enterRomm success：' + res);
                    resolve(res);
                });
        });
    }

    // 本地推流
    getLocalStream() {
        this.localStream = TRTC.createStream({ userId: this.userId, audio: true, video: true });
        this.localStream.setVideoProfile('480p');
    }

    // 开始推流 进入房间成功并开始采集本地音视频流后，才可以开始音视频推流。
    startRTC() {
        return new Promise((resolve, reject) => {
            this.localStream
                .initialize()
                .catch(err => {
                    logger('error', 'startRTC error：' + JSON.stringify(err));
                    reject(err);
                })
                .then(res => {
                    logger('log', 'startRTC success：' + JSON.stringify(res));
                    this.localStream.play('localVideo');
                    resolve(res);
                });
        });
    }

    createShareClient() {
        // 创建用于 屏幕分享的 client
        this.shareClient = TRTC.createClient({
            mode: 'rtc',
            sdkAppId: this.sdkAppId,
            userId: this.shareUserId,
            userSig: this.shareUserId
        });
        // 只负责屏幕共享
        this.shareClient.setDefaultMuteRemoteStreams(true);
    }
    // 开始屏幕分享， 创建分享流，并且 publish 到远端
    startScreenSharing(fn: any) {
        return new Promise<void>((resolve, reject) => {
            if (!this.shareClient) {
                this.createShareClient();
            }

            this.shareClient
                .join({ roomId: this.roomid })
                .then(() => {
                    this.startStream = TRTC.createStream({ audio: false, screen: true });
                    this.startStream
                        .initialize()
                        .then(() => {
                            this.shareClient
                                .publish(this.startStream)
                                .then(() => {
                                    resolve();
                                })
                                .catch(err => {
                                    this.shareClient.leave();
                                    fn();
                                    reject(err);
                                });
                        })
                        .catch(err => {
                            this.shareClient.leave();
                            fn();
                            reject(err);
                        });

                    this.startStream.on('screen-sharing-stopped', () => {
                        this.closeScreenSharing();
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    closeScreenSharing() {
        if (!this.shareClient && !this.startStream) return;
        this.shareClient.unpublish(this.startStream).then(() => {
            // 取消发布本地流成功
            this.startStream.close();
            this.shareClient.leave();
        });
    }

    // 发布本地音视频流
    publish() {
        const { onEvent } = this.props;
        return new Promise((resolve, reject) => {
            this.client
                .publish(this.localStream)
                .catch(err => {
                    logger('error', 'publish success：' + JSON.stringify(err));
                    reject(err);
                })
                .then(res => {
                    this.getLocalVideoStats();
                    this.getRemoteVideoStats();
                    onEvent('sendStartScreenCapToBackground');
                    logger('log', 'publish success：' + JSON.stringify(res));
                    resolve(res);
                });
        });
    }

    // 云端混合流开始录制
    startStreamFun = () => {
        if (!this.first) {
            return;
        }
        this.first = false;
        setTimeout(() => {
            return request({
                url: 'startStream',
                method: 'POST',
                data: {
                    requestId: this.requestId
                }
            });
        }, 5000);
    };

    // 收听远端视频流
    onRemoteStreamUpdate() {
        this.client.on('stream-added', event => {
            const remoteStream = event.stream;
            const remoteUserId = remoteStream.getUserId();
            if (remoteUserId === this.shareUserId) {
                // 取消订阅 shareUserId 的流
                this.client.unsubscribe(this.removeStream);
            } else {
                //订阅远端流
                this.client.subscribe(remoteStream);
            }
        });
        this.client.on('stream-subscribed', event => {
            this.remoteStream = event.stream;
            this.playerStateChanged();
            this.id = this.remoteStream.getId();
            const remoteVideoDom: any = document.querySelector('#remoteVideo');
            this.startStreamFun();
            if (!document.querySelector(`#remoteStream-${this.id}`)) {
                const div = document.createElement('div');
                div.setAttribute(
                    'style',
                    'position: absolute; right: 0; left: 0; top: 0; width: 100%; height: 100%;'
                );
                div.setAttribute('id', `remoteStream-${this.id}`);
                remoteVideoDom.appendChild(div);
            }
            const videoLoading: any = document.querySelector('#video-loading');
            videoLoading.setAttribute('style', 'display: none;');
            // 播放远端流
            this.remoteStream.play(`remoteStream-${this.id}`);
            if (this.state.talkTime == 0) {
                this.recordTalkTime();
            }
        });
    }

    // 记录通话时长
    recordTalkTime(count = 0) {
        this.talkTime = setTimeout(() => {
            this.setState({
                talkTime: count++
            });
            this.recordTalkTime(count);
        }, 1000);
    }

    // 取消发布本地流后远端会收到 'stream-removed' 事件通知
    onRemoteStreamRemove() {
        this.client.on('stream-removed', () => {
            console.log('onRemoteStreamRemove：' + event);
            const parentVideo: any = document.querySelector('#remoteVideo');
            const remoteVideoDom: any = document.querySelector(`#remoteStream-${this.id}`);
            parentVideo.removeChild(remoteVideoDom);
            this.unpublish();
            this.stopRTC();
            this.quit();
        });
    }

    // 监听远端流状态变化
    playerStateChanged() {
        this.remoteStream.on('player-state-changed', event => {
            // 视频流轨道停止，则结束此次视频通话
            if (event.type == 'audio' && event.reason == 'ended') {
                this.reconnect();
            }

            // 视频流恢复
            if (event.type == 'video' && event.reason == 'playing') {
                this.count = 0;
                clearTimeout(this.timer);
            }
        });
    }

    // 如果在收到流结束通知，30秒内，还没有重连，则自动挂断
    reconnect() {
        this.timer = setTimeout(() => {
            this.count++;
            // 如果30秒内不能恢复，则自动断开
            if (this.count >= 30) {
                this.count = 0;
                logger('error', 'reconnect：');
                clearTimeout(this.timer);
                this.props.onEvent('hangUp', 'trtc');
                return;
            }
            this.reconnect();
        }, 1000);
    }

    // 每隔3秒获取本地推流
    getLocalVideoStats() {
        this.localTimer = setInterval(() => {
            this.client.getLocalVideoStats().then(stats => {
                for (let userId in stats) {
                    //     console.log(new Date(), 'getLocalVideoStats', 'userId: ' + userId +
                    // 'bytesSent: ' + stats[userId].bytesSent + 'local userId' + this.userId);
                    if (this.userId == userId && stats[userId].bytesSent == 0) {
                        logger('error', 'agentLeve');
                        this.props.onEvent('hangUp', 'agentLeve');
                    }
                }
            });
        }, 3000);
    }

    // 每隔3秒获取远端推流
    getRemoteVideoStats() {
        this.remoteTimer = setInterval(() => {
            this.client.getRemoteVideoStats().then(stats => {
                const strengthReady: any = document.querySelector('.strength-ready');
                const wifi2 = [1, 2];
                const wifi3 = [1, 2, 3];
                for (let customerCode in stats) {
                    const bytesReceived =
                        (stats[this.customerCode].bytesReceived - this.bytesReceived) / 3000;
                    if (this.customerCode == customerCode) {
                        this.bytesReceived = stats[customerCode].bytesReceived;
                    }

                    if (this.customerCode == customerCode && bytesReceived >= 70) {
                        for (let i = 1; i <= 4; i++) {
                            const wifi: any = document.querySelector(`.wifi-${i}`);
                            wifi.setAttribute('style', 'color: green');
                        }
                        strengthReady.setAttribute('style', 'color: green');
                        return;
                    }

                    if (
                        this.customerCode == customerCode &&
                        bytesReceived >= 30 &&
                        bytesReceived <= 69
                    ) {
                        // 3档，通话质量一般
                        for (let i = 0; i < wifi3.length; i++) {
                            const wifi: any = document.querySelector(`.wifi-${wifi3[i]}`);
                            wifi.setAttribute('style', 'color: #e9a028');
                        }
                        const wifi: any = document.querySelector('.wifi-4');
                        wifi.setAttribute('style', 'color: #a79e91');
                        strengthReady.setAttribute('style', 'color: #e9a028');
                        return;
                    }

                    if (
                        this.customerCode == customerCode &&
                        bytesReceived > 0 &&
                        bytesReceived <= 29
                    ) {
                        // 2档，通话质量差
                        for (let i = 0; i < wifi2.length; i++) {
                            const wifi: any = document.querySelector(`.wifi-${wifi2[i]}`);
                            wifi.setAttribute('style', 'color: red');
                        }
                        const wifi: any = document.querySelector('.wifi-4');
                        const wifi33: any = document.querySelector('.wifi-3');
                        wifi.setAttribute('style', 'color: #a79e91');
                        wifi33.setAttribute('style', 'color: #a79e91');
                        strengthReady.setAttribute('style', 'color: red');
                    }

                    if (this.customerCode == customerCode && bytesReceived == 0) {
                        const wifi44: any = document.querySelector('.wifi-4');
                        const wifi33: any = document.querySelector('.wifi-3');
                        const wifi2: any = document.querySelector('.wifi-2');
                        const wifi: any = document.querySelector('.wifi-1');
                        // 0档，通话断开
                        wifi44.setAttribute('style', 'color: #a79e91');
                        wifi33.setAttribute('style', 'color: #a79e91');
                        wifi2.setAttribute('style', 'color: #a79e91');
                        wifi.setAttribute('style', 'color: #a79e91');
                        strengthReady.setAttribute('style', 'color: #a79e91');
                    }
                }

                // 如果是空对象，则对流断开
                if (isEmpty(stats)) {
                    if (document.querySelector('.wifi-4')) {
                        const wifi44: any = document.querySelector('.wifi-4');
                        const wifi33: any = document.querySelector('.wifi-3');
                        const wifi2: any = document.querySelector('.wifi-2');
                        const wifi: any = document.querySelector('.wifi-1');
                        wifi44.setAttribute('style', 'color: #a79e91');
                        wifi33.setAttribute('style', 'color: #a79e91');
                        wifi2.setAttribute('style', 'color: #a79e91');
                        wifi.setAttribute('style', 'color: #a79e91');
                        strengthReady.setAttribute('style', 'color: #a79e91');
                    }
                }
            });
        }, 3000);
    }

    // 关闭音频
    closeAudio() {
        if (!this.localStream) return;
        this.localStream.muteAudio();
    }

    // 开启音频
    openAudio() {
        if (!this.localStream) return;
        this.localStream.unmuteAudio();
    }

    // 关闭视频
    closeVideo() {
        if (!this.localStream) return;
        this.localStream.muteVideo();
    }
    // 开启视频
    openVideo() {
        if (!this.localStream) return;
        this.localStream.unmuteVideo();
    }
    // 取消发布本地流
    unpublish() {
        if (!this.localStream) return;
        this.client
            .unpublish(this.localStream)
            .catch(err => {
                logger('error', 'unpublish error：' + JSON.stringify(err));
            })
            .then(res => {
                // 取消发布本地流成功
                logger('error', 'unpublish success：' + JSON.stringify(res));
            });
    }

    // 停止推流
    stopRTC() {
        if (!this.localStream) return;
        this.localStream.close();
    }

    // 退出房间
    quit() {
        if (!this.localStream && !this.client) return;
        this.localStream = '';
        this.client.leave();
    }

    // 关闭trtc
    close() {
        clearInterval(this.remoteTimer);
        clearInterval(this.localTimer);
        this.unpublish();
        this.stopRTC();
        this.quit();
        // player-state-changed 事件还没通知，已经走完，这时会另开定时器，所以需要setTimeout
        setTimeout(() => {
            clearTimeout(this.talkTime);
            clearTimeout(this.timer);
        }, 1000);
        // 关闭屏幕共享
        // this.closeScreenSharing();
    }

    render() {
        const { imgStyle, talkTime } = this.state;
        const {
            videoStore: {
                customerInfo,
                insurantName,
                isVideo,
                isAudio,
                isShowModal,
                isShowWaiting,
                countDown
            },
            videoStore
        } = this.props;
        return (
            <section>
                {
                    <div
                        id="modal-container"
                        className={
                            localStorage.isFirstVideo == 'true'
                                ? 'modal-container-hidden'
                                : isShowModal
                                ? 'modal-container modal-container-fadein'
                                : 'modal-container modal-container-fadeout'
                        }
                        draggable="true"
                        onDragStart={this.handlerDown}
                        style={imgStyle}
                    >
                        {isShowWaiting && (
                            <article className="modal-waiting-frame">
                                <img
                                    className="waiting-answer"
                                    src={require('../../assets/images/video/waiting_answer.png')}
                                />
                                <p className="task-id">{insurantName}</p>
                                <p className="task-id">{customerInfo}</p>
                                <div className="waiting-video task-id">等待视频接通中...</div>
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{ width: '120px', height: '40px' }}
                                    onClick={() => this.props.onEvent('answer')}
                                    loading={videoStore.isLoading.get('answer')}
                                >
                                    ({countDown}s)接听
                                </Button>
                            </article>
                        )}
                        {!isShowWaiting && (
                            <article className="modal-video-frame">
                                <div className="video-header">
                                    <span>正在和{insurantName ? insurantName : '-'}通话中</span>
                                    <span>通话时长：{formatSeconds(talkTime)}</span>
                                </div>
                                <div id="localVideo" className="local-video" />
                                <div id="remoteVideo" />
                                <div id="video-loading" className="video-loading">
                                    <Spin />
                                    <span>视频正在建立中，请稍等</span>
                                </div>
                                <div className="wifi">
                                    <div className="wifi-mask"></div>
                                    <span className="wifi-icon strength-ready">
                                        <div className="wifi-background">
                                            <span className="wifi-1"></span>
                                            <span className="wifi-2"></span>
                                            <span className="wifi-3"></span>
                                            <span className="wifi-4"></span>
                                            <div className="triangle"></div>
                                        </div>
                                    </span>
                                </div>
                                <div className="footer-btn">
                                    <img
                                        className="img"
                                        src={
                                            isAudio
                                                ? require('../../assets/images/video/voice.png')
                                                : require('../../assets/images/video/voice2.png')
                                        }
                                        onClick={() => this.props.onEvent('isAudio')}
                                    />
                                    <img
                                        className="img"
                                        src={
                                            isVideo
                                                ? require('../../assets/images/video/video.png')
                                                : require('../../assets/images/video/video2.png')
                                        }
                                        onClick={() => this.props.onEvent('isVideo')}
                                    />
                                    <img
                                        className="img"
                                        src={require('../../assets/images/video/reversal.png')}
                                        onClick={() => this.props.onEvent('isReversal')}
                                    />
                                    <img
                                        className="img"
                                        src={require('../../assets/images/video/taking_photo.png')}
                                        onClick={() => this.props.onEvent('takingPhoto')}
                                    />
                                    {/* <img
                                        className="img"
                                        src={isScreenSharing ? require('../../assets/images/video/screen_share.png') : require('../../assets/images/video/screen_share_2.png')}
                                        onClick={() => this.props.onEvent('isScreenSharing')}
                                    /> */}
                                    <Popconfirm
                                        title="您确认挂断吗？"
                                        onConfirm={() => this.props.onEvent('hangUp')}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <img
                                            className="img"
                                            src={require('../../assets/images/video/hang_up.png')}
                                        />
                                    </Popconfirm>
                                </div>
                            </article>
                        )}
                    </div>
                }
                {isShowModal && isShowWaiting && (
                    <audio autoPlay loop>
                        <source src={require('../../assets/audio/videoRequest.mp3')} />
                    </audio>
                )}
            </section>
        );
    }
}

export default TrtcRoom;
