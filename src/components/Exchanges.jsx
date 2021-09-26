import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { Table, Typography, Avatar } from 'antd';
import millify from 'millify';
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography;


const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const exchangesData = data?.data?.exchanges

    if (isFetching) return <Loader />


    console.log(exchangesData)

    const columns = [
        {
            title: 'Exchanges',
            dataIndex: ['name', 'iconUrl'],
            render: (text, record) => <Text strong>{record.rank}.<Avatar className="exchange-image" src={record.iconUrl} />{record.name}</Text>
        },
        { 
            title: '24h Trade Volume', 
            dataIndex: 'volume',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.volume - b.volume,
            render: text => `$${millify(text)}` },
        { 
            title: 'Markets', 
            dataIndex: 'numberOfMarkets',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.numberOfMarkets - b.numberOfMarkets,
            render: markets => millify(markets)},
        { 
            title: 'Change', 
            dataIndex: 'marketShare',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.marketShare - b.marketShare,
            render: share => `${millify(share)}%`
        }
    ];


    return (
        <Table 
            rowKey='id'
            columns={columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{HTMLReactParser(record.description)}</p>
              }}
            dataSource={exchangesData} />
    )
}

export default Exchanges;
