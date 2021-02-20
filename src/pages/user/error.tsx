import React from 'react';
import './error.less';

class Error extends React.Component {
    myReq: any;

    constructor(props) {
        super(props);
        this.myReq = '';
    }

    componentDidMount() {
        this.error404();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.myReq);
    }

    error404 = () => {
        const c: any | null = document.getElementById('canv');
        const $ = c.getContext('2d');
        const w = c.width;
        const h = c.height;
        const id = $.createImageData(w, h);
        const _this = this;
        function draw() {
            _this.myReq = window.requestAnimationFrame(draw);
            let r: any;
            for (let p = 4 * (w * h - 1); p >= 0; p -= 4) {
                r = Math.random();
                id.data[p] = id.data[p + 1] = id.data[p + 2] = 255 * Math.pow(r, 1.6);
                id.data[p + 3] = 255;
            }
            $.putImageData(id, 0, 0);
        }
        draw();
    };
    render() {
        return (
            <div className="error404">
                <svg className="overlay text" viewBox="0 0 900 400">
                    <symbol id="main">
                        <text textAnchor="middle" x="50%" y="50%" dy="0.25em" className="txt">
                            404
                        </text>
                        <text textAnchor="middle" x="50%" y="90%" dy="0.25em" className="txt2">
                            Not Found
                        </text>
                    </symbol>
                    <mask id="msk" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                        <rect width="100%" height="100%" className="wrap"></rect>
                        <use xlinkHref="#main" className="mtxt" />
                    </mask>
                </svg>
                <section>
                    <h1>
                        <div className="fill">
                            <canvas
                                id="canv"
                                width="460"
                                height="360"
                                style={{ background: 'hsla(0, 0, 0, 1)' }}
                            ></canvas>
                        </div>
                        <svg viewBox="0 0 900 400" className="inv">
                            <rect width="100%" height="100%" mask="url(#msk)" className="rect" />
                            <use xlinkHref="#main" className="clear" />
                        </svg>
                    </h1>
                </section>
            </div>
        );
    }
}

export default Error;
