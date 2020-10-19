import { observable, action } from 'mobx';
class CounterStore {
    @observable obj = {
        count: 0
    };

    @action
    add() {
        this.obj.count++;
    }

    @action
    reduce() {
        this.obj.count--;
    }
}

export default CounterStore;