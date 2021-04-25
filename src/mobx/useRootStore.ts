import React from 'react';
import * as rootStore from '@/mobx/rootStore';

const storeContext = React.createContext<IStore>({ ...rootStore });

export const useRootStore = () => {
    const store = React.useContext(storeContext);
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};
