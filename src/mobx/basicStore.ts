import { action, observable } from 'mobx';

export default class BasicStore {
    @observable isLoading = observable.map({});

    @action
    changeLoadingStatus(loadingType: any, type: any) {
        this.isLoading.set(loadingType, type);
    }
}

// 初始化loading
export function initLoading(target: any, key: any, descriptor: any) {
    const oldValue = descriptor.value;

    descriptor.value = async function (...args: any) {
        this.changeLoadingStatus(key, true);
        let res: any;
        try {
            res = await oldValue.apply(this, args);
            // eslint-disable-next-line no-useless-catch
        } catch (error) {
            // 做一些错误上报之类的处理
            throw error;
        } finally {
            this.changeLoadingStatus(key, false);
        }
        return res;
    };

    return descriptor;
}
