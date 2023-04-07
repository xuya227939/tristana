// eslint-disable-next-line no-unused-vars
import { RouterStore as _RouterStore } from 'mobx-react-router';

declare global {
    type RouterStore = _RouterStore;

    interface IStore {
        routerStore: RouterStore;
        // eslint-disable-next-line no-undef
        dashboardStore: IDashboardStore.DashboardStore;
    }
}
