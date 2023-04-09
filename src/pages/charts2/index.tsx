import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import './index.less';

const Charts: React.FC<any> = () => {
    const [data2, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => {
                console.log('fetch data failed', error);
            });
    };
    const config2 = {
        data: data2,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1]
        }
    };
    return (
        <section className="charts-warrper">
            <div className="chart">
                <h1>基础面积图</h1>
                <Area {...config2} />
            </div>
        </section>
    );
};

export default Charts;
