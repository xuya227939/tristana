import { observable, action, runInAction } from 'mobx';
import * as api from '@servers/dashboard';
import BasicStore, { initLoading } from '../basicStore';

export class DashboardStore extends BasicStore {
    @observable
    list: any = [];

    @initLoading
    @action
    async getTable() {
        const res: any = await api.getTable();
        runInAction(() => {
            this.list = res.result;
        });
    }
}

export default new DashboardStore();
