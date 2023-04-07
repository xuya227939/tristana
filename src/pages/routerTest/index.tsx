import React from 'react';

const RouterTest: React.FC<any> = props => {
    return (
        <button onClick={() => props.history.push('/routerTest/routerTestDetail')}>
            点我进二级路由
        </button>
    );
};

export default RouterTest;
