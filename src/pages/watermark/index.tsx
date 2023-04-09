import React from 'react';
import { Watermark } from 'antd';
import './index.less';

const WatermarkCp: React.FC<any> = () => {
    return (
        <Watermark content="江辰">
            <section className="watermark"></section>
        </Watermark>
    );
};

export default WatermarkCp;
