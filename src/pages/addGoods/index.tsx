import React from 'react';
import { Button, Select, Input, InputNumber, DatePicker, Form, message } from 'antd';
import './index.less';

const { RangePicker } = DatePicker;

const { Option } = Select;

const SELECT_WIDTH = 340;

function AddGoods() {
    const [messageApi, contextHolder] = message.useMessage();
    // 表单提交
    const handleSubmit = (values: any) => {
        messageApi.success('submit success!');
        console.log('Success:', values);
    };

    const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 14 } };

    return (
        <section className="addGoods">
            {contextHolder}
            <Form
                {...formItemLayout}
                style={{ maxWidth: 800 }}
                labelAlign="left"
                name="addGoods"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="商品名称"
                    name="goodsName"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品名称'
                        }
                    ]}
                >
                    <Input style={{ width: SELECT_WIDTH }} placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item
                    label="条形码"
                    name="barCode"
                    rules={[
                        {
                            required: true,
                            message: '请输入条形码'
                        }
                    ]}
                >
                    <Input style={{ width: SELECT_WIDTH }} placeholder="请输入条形码" />
                </Form.Item>
                <Form.Item label="库存量" name="inventory">
                    <InputNumber style={{ width: SELECT_WIDTH }} placeholder="请输入库存量" />
                </Form.Item>
                <Form.Item label="商品标签" name="goodsLabel">
                    <Select allowClear style={{ width: SELECT_WIDTH }} placeholder="请选择下单方式">
                        <Option value={1}>新品</Option>
                        <Option value={2}>数码</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="创建时间" name="createTime">
                    <RangePicker style={{ width: SELECT_WIDTH }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}

export default AddGoods;
