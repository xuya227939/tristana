import React from 'react';
import { Pie } from '@ant-design/plots';
import './index.less';

const Charts: React.FC<any> = () => {
    const data3 = [
        {
            type: '分类一',
            value: 27
        },
        {
            type: '分类二',
            value: 25
        },
        {
            type: '分类三',
            value: 18
        },
        {
            type: '分类四',
            value: 15
        },
        {
            type: '分类五',
            value: 10
        },
        {
            type: '其他',
            value: 5
        }
    ];
    const config3 = {
        appendPadding: 10,
        data: data3,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center'
            }
        },
        interactions: [
            {
                type: 'element-active'
            }
        ]
    };
    return (
        <section className="charts-warrper">
            <div className="chart">
                <h1>饼图</h1>
                <Pie {...config3} />
            </div>
        </section>
    );
};

export default Charts;
