import Mock from 'mockjs';

const getTable = Mock.mock(window.location.origin + '/api/getTable.json', 'get', {
    result: [
        {
            orderId: '61011727',
            image: '/images/1.jpg',
            customerName: '小红',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '73580830',
            image: '/images/2.jpg',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '90506090',
            image: '/images/3.jpg',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '64413424',
            image: '/images/4.jpg',
            customerName: '小明',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '73725798',
            image: '/images/5.jpg',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91780336',
            image: '/images/6.jpg',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91775287',
            image: '/images/7.jpg',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '38370406',
            image: '/images/8.jpg',
            customerName: '小黑',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '18339567',
            image: '/images/9.jpg',
            customerName: '小蓝',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '80573291',
            image: '/images/10.jpg',
            customerName: '小蓝',
            placeOrder: '自主下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        },
        {
            orderId: '91635681',
            image: '/images/11.jpg',
            customerName: '小红',
            placeOrder: '代下单',
            goodsName: '智能机器人',
            price: '￥199',
            placeOrderTime: '2018-12-17'
        }
    ]
});

export { getTable };
