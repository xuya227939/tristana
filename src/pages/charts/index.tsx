import React, { useEffect, useState } from 'react';
import { Column, Area, Pie } from '@ant-design/plots';
import './index.less';

const Charts: React.FC<any> = () => {
    const data = [
        {
            type: '家具家电',
            sales: 38
        },
        {
            type: '粮油副食',
            sales: 52
        },
        {
            type: '生鲜水果',
            sales: 61
        },
        {
            type: '美容洗护',
            sales: 145
        },
        {
            type: '母婴用品',
            sales: 48
        },
        {
            type: '进口食品',
            sales: 38
        },
        {
            type: '食品饮料',
            sales: 38
        },
        {
            type: '家庭清洁',
            sales: 38
        }
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false
            }
        },
        meta: {
            type: {
                alias: '类别'
            },
            sales: {
                alias: '销售额'
            }
        }
    };

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
            <div className="chart1">
                <h1>基础柱状图</h1>
                <Column {...config} />
            </div>
            <div className="chart1">
                <h1>基础面积图</h1>
                <Area {...config2} />
            </div>
            <div className="chart1">
                <h1>饼图</h1>
                <Pie {...config3} />
            </div>
        </section>
    );
};

export default Charts;
