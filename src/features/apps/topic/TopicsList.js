import React, { useState, useEffect, forwardRef } from 'react';
import { useSelector } from "react-redux";
import TopicItem from './TopicItem';
import TopicPagination from './TopicPagination';
import { useTopicsQuery, useGetTopicsMutation } from './php/topicApi';
import {
  Heading,
  Spinner,
  Checkbox
} from "@chakra-ui/react";
import { Star } from 'react-feather';
import PopoverForm from '../../../components/PopoverForm';
import useToggle from '../../../hooks/useToggle';
import { Input, Button, Tooltip, Space, Popover, Tabs, Typography, Row, Col, Avatar, Card, Skeleton, Switch, Affix, message, Pagination, Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function TopicsList({ filterTopics, getTopic }) {

  const {
    data: topics,
    isLoading,
    isSuccess,
    isError,
    error
  } = useTopicsQuery();
  const { Search } = Input;
  const { Title } = Typography;
  if (filterTopics) {
    topics=filterTopics;
  }

  const [selectCheck, setSelectCheck] = useToggle();
  const pageSize = 5;
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(
    () => {
      if(topics){
        setMinIndex(0);
        setMaxIndex(pageSize);
        setTotalPage(topics.length);
      }
    },
    [topics]
  );
  const handleChange = (page) => {
    setMinIndex( (page - 1) * pageSize );
    setMaxIndex( page * pageSize );
    setCurrent(page);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Showing detail');
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {contextHolder}
      <div className='row container mt-3'>
        <div className='col-md-7'>
          <Heading
            as="h1"
            fontSize={{ base: "12px", md: "18px" }}
            fontWeight="700"
          >
            Topics
          </Heading>
        </div>
        <div className='col-md-5'>
          <Tooltip title="Compose new topic">
            <Button type="primary" onClick={() => getTopic(0)} icon={<EditOutlined />}>Compose</Button>
          </Tooltip>
        </div>
      </div>
      <Row className='mt-2'>
        <Col span={17}>
          <p className='small pl-3 text-muted'>{topics.length} topics</p>
        </Col>
        <Col span={7}>
          <Switch onClick={info} size="small" defaultChecked /> <span className='pl-1 small text-muted' >Details</span>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={3} className='pl-3 pt-2'>
          <Checkbox onChange={setSelectCheck}> </Checkbox>
        </Col>
        <Col span={17}>
            { selectCheck ? 
                <div className="mr-2">
                  <Button className="mr-2" size={12}>Select All </Button>
                  <Button className="mr-2" size={12}>Delete </Button>
              </div> : 
                <Search
                  placeholder="search topics"
                  allowClear
                  style={{
                    width: 230,
                  }}
                />
            }
        </Col>
        <Col span={4}>
          <PopoverForm />
        </Col>
      </Row>
      <div className='' style={{ maxHeight: 360, overflow: 'auto', width: 320, marginTop: 2, marginBottom: 10, padding:0 }} >
      {topics.map(
            (topic, index) =>
              index >= minIndex &&
              index < maxIndex && (
                <Badge.Ribbon color="blue" text={topic.post_status} size="small" className=" mr-2 mt-0" key={topic.id}>
                  <Card bordered={true} hoverable="true" style={{ width: 300, marginTop: 0, marginRight: 20, padding:0 }} className="slim-card p-0 ml-1 mt-2 m-0">
                    <Row className="p-0">
                      <Col span={4} className="pt-3 pl-3">
                          {selectCheck ? 
                            <div style={{ display: selectCheck ? "block" : "none" }} className="mr-2">
                            <Checkbox></Checkbox>
                          </div> : 
                            <span className='align-left muted'><Star size={15} /> </span>
                          }
                        </Col>
                      <Col span={20} className="pr-5">
                          <Title onClick={() => getTopic(topic.id)}  level={5}>{topic.title}</Title>

                          <div className='details small text-muted'>
                            <p>Word count: 100</p>
                            <p>Created: 2 days ago.</p>
                            <p>Last updated: 1 day ago</p>
                          </div>
                      </Col>
                    </Row>
                  </Card>
                </Badge.Ribbon>
        ))}
      </div>
      <Pagination
          className='ml-5'
          current={current}
          onChange={handleChange}
          pageSize={pageSize}
          total={totalPage}
          style={{ bottom: "0px" }}
        />
    </>
  );
}
