import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { useGetTopicsMutation, useGetTopicByIdQuery, useGetTopicsByCategoryIdQuery } from './services/topicApi';
import { Input, Empty, Typography, Row, Col, Avatar, Card, Button, Switch, Collapse } from 'antd';
import { AbsoluteCenter, Grid, GridItem, Box,Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import LeftSidePane from "../../../components/LeftSidePane";
import RightSidePane from "../../../components/RightSidePane";
import PopoverForm from '../../../components/PopoverForm';
import PopoverList from '../../../components/PopoverList';
import { EditOutlined } from '@ant-design/icons';

const TopicApp = () => {
  const [filter, setFilter] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState(null); // initialize with skipToken to skip at first
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [currentTopic, setCurrentTopic] = useState([]);
  const [selection, setSelection] = useState([]);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const { Search } = Input;
  const { Meta } = Card;
  const { Title } = Typography;
  const { Panel } = Collapse;

  const categoryChangeHandler = (data) => {
    setSelection(data);
    const category_id = data;
    if (category_id === 0) {
      setFilter(false);
    } else {
      setFilter(true);
      setCurrentCategory(category_id);
      setCurrentCategoryId(category_id);
    }
  };
  const filteredTopics_rtk = useGetTopicsByCategoryIdQuery({ category_id: currentCategory })
  const filterTopics = filteredTopics_rtk['data'];
  const topicData_res = useGetTopicByIdQuery({ id: currentTopicId })
  const currentTopic_res = topicData_res.data;
  const addTopicData = {"id":"0","title":"","description":"","published":"","createdAt":"2022-11-23 16:22:34"}

  const getTopic = (id) => {
    if (id === 0) {
      setCurrentTopicId(0);
      setCurrentTopic( currentTopic.concat(addTopicData) );
    } else {
      /// FETCH TOPIC DETAILS
      setCurrentTopicId(id);
      setCurrentTopic( currentTopic.concat(currentTopic_res) );
    }
  };

  return (
    <Grid pos="relative">
      {" "}
      <Flex mt="1px" gap={2} pos="relative">
        <Box
          boxShadow="2xl"
          bg="white"
          w="30%"
          pos="absolute"
          top={0}
          left={showLeftSidebar ? 0 : "-30%"}
          transition="all 0.3s ease-in"
          zIndex={1}
        >
          <LeftSidePane
            setShowLeftSidebar={setShowLeftSidebar}
            setShowRightSidebar={setShowRightSidebar}
            showLeftSidebar={showLeftSidebar}
          >
            <CategoriesList
              selection={selection}
              currentCategory={currentCategory}
              categoryChangeHandler={categoryChangeHandler}
            />
            <TopicsList
              getTopic={getTopic}
              currentCategory={currentCategory}
              filterTopics={filterTopics}
            />
          </LeftSidePane>
        </Box>
        <Box
          p="6"
          pos="relative"
          flexGrow={1}
          ml={showLeftSidebar ? "30%" : "0"}
          mr={showRightSidebar ? "30%" : "0"}
          transition="all 0.2s ease-out"
        >
          <Flex justifyContent="space-between">
            {currentTopic && currentTopic.length? ( 
              <TopicDetail
                currentTopic={currentTopic}
              />
            ) : (
              <Empty className="ml-5 mt-lg-5" description="Click on a topic." />
            )}
          </Flex>
        </Box>
        <Box
          key="right-pane"
          initial={{ x: 500, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 500, opacity: 0 }}
          p="6"
          w="27%"
          pos="fixed"
          top={50}
          right={showRightSidebar ? 0 : "-30%"}
          transition="all 0.3s ease-in"
        >
          <RightSidePane
            setShowLeftSidebar={setShowLeftSidebar}
            setShowRightSidebar={setShowRightSidebar}
            showRightSidebar={showRightSidebar}
          >
              <Card hoverable="true" style={{ border:2, width: 300, marginTop: 16 }}>
              <Row>
                <Col span={4}>
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                  </Col>
                <Col span={20}>
                  <Title level={5}>Topic author</Title>
                  <p className="text-muted">Not assigned to any user. <Button>Invite!</Button></p>
                </Col>
              </Row>
                <Row>
                  <Col span={24}>
                  {/* defaultActiveKey={['1']}  */}
                    <Collapse ghost>
                      <Panel header="Content Analyzer" key="1">
                          <table className="table">
                            <tr>
                              <td>Word Count</td>
                              <td> 100 / 1000</td>
                            </tr>
                            <tr>
                              <td>#H1 tag</td>
                              <td> 0 / 5</td>
                            </tr>
                            <tr>
                              <td>#Paragraphs</td>
                              <td> 0 / 20</td>
                            </tr>
                          </table>
                          <p>Topic Comments</p>
                      </Panel>
                      <Panel header="Comments" key="2">
                          <p>List of comments about the topic.</p>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
            </Card>
            <Card hoverable="true" style={{ border:2, width: 300, marginTop: 16 }}>
              <Tabs>
                <TabList>
                  <Tab>Library</Tab>
                  <Tab>Dictionary</Tab>
                  <Tab>Three</Tab>
                </TabList>
                <TabPanels>
              <TabPanel>
                <Row className='mt-0'>
                  <Col span={21}>
                    <Search
                            placeholder="search library"
                            allowClear
                            style={{
                              width: 190,
                            }}
                          />
                  </Col>
                  <Col span={3}>
                    <PopoverForm />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col span={14}>
                    <p className='small pl-3 text-muted'>0 items</p>
                  </Col>
                  <Col span={10}>
                    <Switch size="small" defaultChecked /> <span className='pl-1 small text-muted' >Details</span>
                  </Col>
                </Row>
                
                  <Card bordered={true} hoverable="true" style={{ marginTop: 0, marginRight: 20 }} className="slim-card p-0 mt-2 m-0">
                    <Row className="p-0">
                      <Col span={24} className="pl-2">
                          <Title level={5}>Description</Title>
                          <div className='details small text-muted'>
                            <p>Word count: 100</p>
                          </div>
                      </Col>
                    </Row>
                  </Card>

              </TabPanel>
              <TabPanel>
              <Row className='mt-0'>
                  <Col span={21}>
                    <Search
                            placeholder="search dictionary"
                            allowClear
                            style={{
                              width: 190,
                            }}
                          />
                  </Col>
                  <Col span={3}>
                    <PopoverForm />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col span={14}>
                    <p className='small pl-3 text-muted'>0 words</p>
                  </Col>
                  <Col span={10}>
                    <Switch size="small" defaultChecked /> <span className='pl-1 small text-muted' >Details</span>
                  </Col>
                </Row>
                
                  <Card bordered={true} hoverable="true" style={{ marginTop: 0, marginRight: 20 }} className="slim-card p-0 mt-2 m-0">
                    <Row className="p-0">
                      <Col span={24} className="pl-2">
                          <Title level={5}>good <PopoverList icon={<EditOutlined />} /></Title>
                          <div className='details small text-muted'>
                            <p>Meaning: best, nice, worthy, decent, ethical</p>
                          </div>
                      </Col>
                    </Row>
                  </Card>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
              </Tabs>
            </Card>
          </RightSidePane>
        </Box>
      </Flex>
    </Grid>
  );
};

export default TopicApp;
