import { observable, action, runInAction } from 'mobx';
import * as api from '@servers/dashboard';
import BasicStore, { initLoading } from '../basicStore';

class DashBoardStore extends BasicStore {
    @observable
    list = [];

    @initLoading
    @action
    async getTable() {
        const res = await api.getTable();
        runInAction(() => {
            this.list = res.result;
        });
    }
}

export default DashBoardStore;