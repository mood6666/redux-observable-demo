import React, {PropTypes} from 'react';
import { Form, Select, Button, DatePicker, message, Radio, Input, Table } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker } = DatePicker;
import { connect } from 'react-redux';
import moment from 'moment';

const columns = [{
    title: '用户标签',
    className: 'table-thead',
    dataIndex: 'user_tag',
    key: 'user_tag',
}, {
    title: '用户UID',
    className: 'table-thead',
    dataIndex: 'uid',
    key: 'uid',
}, {
    title: '当月最高日达标金额',
    className: 'table-thead',
    dataIndex: 'daily_money',
    key: 'daily_money',
}, {
    title: '当月最高周达标金额',
    className: 'table-thead',
    dataIndex: 'weekly_money',
    key: 'weekly_money',
}, {
    title: '月达标金额',
    className: 'table-thead',
    dataIndex: 'monthly_money',
    key: 'monthly_money',
}];

class Home extends React.Component {

    componentDidMount() {
        const { store } = this.context;
        const { query } = store.getState().routing.locationBeforeTransitions;
        const { setFieldsValue } = this.props.form;

        console.log('query', query)

        if (query.user_type) {
            setFieldsValue({
                user_type: parseInt(query.user_type, 10),
                month: moment(query.month)
            });

            store.dispatch({
                type: 'getData',
                data: query,
            });
        }
    }

    search () {
        const { validateFields } = this.props.form;

        validateFields((err, value) => {
            if (!err) {
                const { store } = this.context;

                console.log(store.getState().tableData.searchData)

                store.dispatch({
                    type: 'getData',
                    data: {
                        user_type: value.user_type,
                        month: value.month.format('YYYY-MM'),
                        page: 1,
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { list, isLoad, count, currentPage = 1 } = this.props.tableData;
        const { store } = this.context;
        const searchData = store.getState().tableData.searchData;

        console.log('count', count)
        console.log('currentPage', currentPage)
        const pagination = {
            total: count,
            pageSize: 20,
            current: currentPage,
            onChange: (current) => {
                const { store } = this.context;
                store.dispatch({
                    type: 'getData',
                    data: Object.assign({}, searchData, {
                        page: current,
                    })
                });
            },
        };

        return(
            <div>
                <Form
                    layout="inline"
                >
                    <FormItem
                        label="用户标签"
                    >
                        {
                            getFieldDecorator('user_type')(
                                <Select
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <Option value={1}>全部客户</Option>
                                    <Option value={2}>大客户</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label="查询期间"
                    >
                        {
                            getFieldDecorator('month')(
                                <MonthPicker />
                            )
                        }
                    </FormItem>
                    <Button
                        onClick={() => {
                            this.search();
                        }}
                    >
                        查询
                    </Button>
                </Form>
                <Table
                    columns={columns}
                    dataSource={list}
                    loading={isLoad}
                    pagination={pagination}
                    style={{
                        marginTop: 20,
                    }}
                />
            </div>
        );
    }
}

Home.contextTypes = {
    store: PropTypes.object.isRequired,
}

export default   connect(({tableData}) => ({
    tableData
}))(Form.create()(Home));

