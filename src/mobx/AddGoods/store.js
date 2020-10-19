import { observable, action } from 'mobx';
class AddGoodsStore {
    @observable name = 'sun';

    @action
    changeName() {
        if (this.name === 'sun') {
            this.name = 'wen';
            return;
        }

        if(this.name == 'wen') {
            this.name = 'sun';
        }
    }
}

export default AddGoodsStore;