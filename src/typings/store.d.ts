// eslint-disable-next-line no-unused-vars
import { RouterStore as _RouterStore } from 'mobx-react-router';

declare global {
    interface RouterStore extends _RouterStore {}

    interface IStore {
        routerStore: RouterStore;
        dashboardStore: IDashboardStore.DashboardStore;
    }
}
