import TopicDetailTab from './TopicDetailTab2';
import { Tabs, Tab, TabList, TabPanels } from '@chakra-ui/react';
import _ from 'lodash';
import { XCircle } from 'react-feather';


const TopicDetail = ({ currentTopic }) => {
  const filtered = currentTopic.filter(function (el) {
    return el != null;
  });
  const uniqueFiltered = _.uniqBy(filtered, 'id');
  const handleCloseTab = (e) => {
    e.preventDefault();
    alert("Close");
  };
  return (

<>
{uniqueFiltered && uniqueFiltered.length ? 
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList>
          {uniqueFiltered?.map((topic) => (
              <Tab key={topic.id}>
                { topic.id ==0 ? "add" : "edit" }#{topic.id} 
                <XCircle className="pl-1" onClick={handleCloseTab} size={18} /></Tab>
          ))}
      </TabList>
      <TabPanels>
          {uniqueFiltered?.map((topic) => (
            <TopicDetailTab key={topic.id} 
              id={topic.id}
              editTitle={topic.title}
              editDescription={topic.description}
            />
          ))}    
      </TabPanels>
    </Tabs>
 : <p>Empty</p>}
</>
  );
};

export default TopicDetail;
