import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { useGetTopicsMutation, useGetTopicByIdQuery, useGetTopicsByCategoryIdQuery } from './php/topicApi';
import { Empty, Typography, Row, Col, Avatar, Card, Button, Switch } from 'antd';
import { AbsoluteCenter, Grid, GridItem, Box,Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import LeftSidePane from "../../../components/LeftSidePane";
import RightSidePane from "../../../components/RightSidePane";

const TopicApp = () => {
  const [filter, setFilter] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null); // initialize with skipToken to skip at first
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [currentTopic, setCurrentTopic] = useState([]);
  const [selection, setSelection] = useState([]);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const { Meta } = Card;
  const { Title } = Typography;

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
          p="2rem"
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
          bg="white"
          w="30%"
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
            <Card
              bordered={true}
              hoverable="true"
              style={{ border: 1, width: 300, marginTop: 16 }}
            >
              <Row>
                <Col span={4}>
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Col>
                <Col span={20}>
                  <Title level={5}>Topic author</Title>
                  <p className="text-muted">
                    Not assigned to any user. <Button>Invite!</Button>
                  </p>
                </Col>
              </Row>
            </Card>

            <Card
              hoverable="true"
              style={{ border: 2, width: 300, marginTop: 16 }}
            >
              <Tabs>
                <TabList>
                  <Tab>One</Tab>
                  <Tab>Two</Tab>
                  <Tab>Three</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
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
