import Mock from 'mockjs';

const getTable = Mock.mock(location.origin + '/api/getTable.json', 'get', {
    result: [
        {
            orderId: '61011727',
            customerName: '小红',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '73580830',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '90506090',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '64413424',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '73725798',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91780336',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91775287',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '38370406',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '18339567',
            customerName: '小蓝',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '80573291',
            customerName: '小蓝',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91635681',
            customerName: '小红',
            placeOrder: '代下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        }
    ]
});

export { getTable };
