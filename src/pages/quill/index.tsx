import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

const Quill: React.FC<any> = () => {
    const [value, setValue] = React.useState('');
    return (
        <section className="quill">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
        </section>
    );
};

export default Quill;
