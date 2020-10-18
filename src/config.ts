// 基础配置
export const BASE_LAYOUT = {
    GROD_COL: {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 21 }
        },
        labelAlign: 'left'
    }
};

// export const BASE_API = (process.env.NODE_ENV === 'development' ? 'https://downfuture.com/api/v1/' : (process.env.NODE_ENV == 'test' ? 'https://downfuture.com/api/v1/' : 'https://downfuture.com/api/v1/'));
export const BASE_API = location.origin + '/api/';

export const SOCKET_URL = (process.env.NODE_ENV === 'development' ? '//localhost:9000/api/v1/' : (process.env.NODE_ENV == 'test' ? 'https://downfuture.com/api/v1/' : 'https://downfuture.com/api/v1/'));