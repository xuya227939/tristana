import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';

function RefHook(props, ref) {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);
    const divRef = useRef();

    useImperativeHandle(ref, () => ({
        count,
        // eslint-disable-next-line no-use-before-define
        func1
    }));

    const func1 = () => {
        console.log(555);
    };

    return (
        <>
            <div ref={divRef}>123</div>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    );
}

const WrappedForm = forwardRef(RefHook);
export default WrappedForm;
