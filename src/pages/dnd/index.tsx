import React from 'react';
import Draggable from 'react-draggable';
import './index.less';

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
        </section>
    );
};

export default Dnd;
