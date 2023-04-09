# Tristana（Webpack）

如果觉得不错，请麻烦点个`Star`，非常感谢

一款轻量级的项目框架，基于 [React](https://github.com/facebook/react)、[Webpack](https://github.com/webpack/webpack) 和 [React-Router](https://github.com/ReactTraining/react-router)

---

## 页面部分截图

<img alt="1" src="./images/1.png" width="25%" /><img alt="1" src="./images/2.png" width="25%" /><img alt="1" src="./images/3.png" width="25%" /><img alt="1" src="./images/4.png" width="25%" /><img alt="1" src="./images/5.png" width="25%" /><img alt="1" src="./images/6.png" width="25%" />

## 为何不是？

### create-react-app

create-react-app 是基于 `webpack` 的打包层方案，包含 `build、dev、lint` 等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置。所以，如果大家想基于他修改部分配置，或者希望在打包层之外也做技术收敛时，就会遇到困难。

### umi

umi 提供的功能很多，这也导致它太过于臃肿。而且你还要去学它的封装化配置，而不是学原生第三方库的配置，如果你只想要一些简单的功能，追求更高的可玩性，哪 umi 不太适合。

## 特性

-   **快速上手**，只要您了解 `React`、`Mobx`、`Webpack` 和 `React Router`，就可以快速搭建中后台管理平台
-   **路由系统**，基于 `react-router` 实现的路由系统
-   **Loading**，不需要重复写按钮 `Loading` 判断
-   **国际化**，基于 `react-intl-universal` 实现的国际化
-   **网络请求**，基于 `axios` 实现的请求拦截
-   **页面交互**，基于 `mobx` 实现的数据交互方式
-   **UI**，使用业界最著名的 `ant-design`
-   **代码规范校验**，使用 `eslint`、`lint-staged`、`prettier`、`stylelint`
-   **模拟请求数据**，基于 `mockjs` 实现
-   **持久化缓存**，通过 `localStorage` 实现本地化持久化缓存

## Demo

[Tristana](https://order.downfuture.com/#/dashboard)

### 是否可以在生产环境中使用?

当然！预计公司生产环境共有 5+ 个项目

### 支持 IE 吗?

不支持

## 开始

```
$ git clone https://github.com/xuya227939/tristana.git

$ cd tristana

$ git checkout webpack5

$ npm install

$ npm run dev
```

## 部署

```
$ npm run build
```

## 联系我

<img src="https://sight-world.oss-cn-hangzhou.aliyuncs.com/images/wechat.jpeg?Expires=1681041596&OSSAccessKeyId=TMP.3KgnjbH2kYrsje5Y463Cb4v5SFCk8zh557S16vaYUx4Wdeff6rmC5VtuuvKLZKXdePfxNQdXLdeiGbRRrArN5Npp4avhxD&Signature=FWTtfztAvH%2F7WLXyKhSjN2mmbCE%3D" width="400">

## License

[MIT](https://tldrlegal.com/license/mit-license)
