import { configure } from 'mobx';
import DashboardStore from './Dashboard/store';
import AddGoodsStore from './AddGoods/store';
import CounterStore from './CounterStore/store';

configure({ enforceActions: 'always' });
class Store {
    constructor() {
        this.dashboardStore = new DashboardStore();
        this.addGoodsStore = new AddGoodsStore();
        this.counterStore = new CounterStore();
    }
}
export default new Store();