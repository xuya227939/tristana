import React from 'react';
import Draggable from 'react-draggable';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import './index.less';

const { Dragger } = Upload;

const Dnd: React.FC<any> = () => {
    // eslint-disable-next-line prefer-const
    let [activeDrags, setActiveDrags] = React.useState<number>(0);
    const onStart = () => {
        setActiveDrags(++activeDrags);
    };
    const onStop = () => {
        setActiveDrags(--activeDrags);
    };
    const dragHandlers = { onStart, onStop };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    };

    return (
        <section className="draggable">
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[50, 50]}
                scale={1}
                {...dragHandlers}
            >
                <div>
                    <div className="handle">Drag from here</div>
                    <div>This readme is really dragging on...</div>
                    <p>Active DragHandlers: {activeDrags}</p>
                </div>
            </Draggable>

            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company
                    data or other banned files.
                </p>
            </Dragger>
        </section>
    );
};

export default Dnd;
