import React, { useState, useRef, useCallback, useEffect } from 'react';
import RefHook from './testRef';

function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null);

    const setStateCallback = useCallback((state, cb) => {
        cbRef.current = cb;
        setState(state);
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, state);

    return [state, setStateCallback];
}

function Hook() {
    const [activeKey, useActiveKey] = useStateCallback(false);
    const ref = useRef();

    useEffect(() => {
        useActiveKey(!activeKey, res => {
            console.log(
                '%c 🍶 activeKey: ',
                'font-size:20px;background-color: #B03734;color:#fff;',
                res
            );
        });
    }, []);

    return (
        <div>
            <RefHook ref={ref} />
        </div>
    );
}

export default Hook;
