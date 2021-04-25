import request from '@/request';

// 获取表格数据
export function getTable() {
    return request({
        url: 'getTable.json',
        method: 'GET'
    });
}
