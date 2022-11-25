import React, { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import TopicItem from './TopicItem';
import TopicPagination from './TopicPagination';
import { useTopicsQuery } from './services/topicApi';
import { getMultiple } from './slices/topicSlice';
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

export default function TopicsList({ getTopic, currentCategory }) {

  const [selectCheck, setSelectCheck] = useToggle();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch()

  const {
    data:topics,
    isLoading,
    isSuccess,
    isError,
    error
  } = useTopicsQuery({currentPage, currentCategory});
  const { Search } = Input;
  const { Title } = Typography;
  // console.log("topics - currentCategory: " + JSON.stringify(currentCategory));

  useEffect(
    () => {
      if(topics){
        setTotalPage(topics.meta.totalCount[0].results);
      }
    },
    [topics]
  );

  const handleChange = (page) => {
    setCurrentPage(page);
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
          <p className='small pl-3 text-muted'>{topics.meta.totalCount[0].results} topics</p>
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
                    width: 200,
                  }}
                />
            }
        </Col>
        <Col span={4}>
          <PopoverForm />
        </Col>
      </Row>
      <div className='' style={{ maxHeight: 360, overflow: 'auto', width: 320, marginTop: 2, marginBottom: 10, padding:0 }} >
      {topics.data.map(
            (topic, index) => (
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
          currentPage={currentPage}
          currentCategory={currentCategory}
          onChange={handleChange}
          // pageSize={pageSize}
          total={totalPage}
          style={{ bottom: "0px" }}
        />
    </>
  );
}
