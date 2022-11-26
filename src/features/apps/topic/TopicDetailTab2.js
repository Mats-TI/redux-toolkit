import React, {useState, useEffect} from 'react';
import { useAddTopicMutation, useUpdateTopicMutation } from "./services/topicApi";
import { TabPanel, useToast, ButtonGroup, IconButton, Button } from '@chakra-ui/react';
import { Plus } from 'react-feather';
import PopoverForm from '../../../components/PopoverForm';

// REACT-QUILL
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";



const TopicDetailTab = ({ id, editTitle, editDescription }) => {

  const toast = useToast();
  const [title, setTitle] = useState(editTitle);
  const [description, setDescription] = useState(editDescription);

  //// QUIL
  var modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      ["image"],
      [{ color: [] }, { background: [] }],

      ["clean"]
    ],
    clipboard: {
      matchVisual: false
    },
  };

  const { quill, quillRef } = useQuill({
    modules
  });

  const [updateTopic, { data, error, isSuccess }] = useUpdateTopicMutation();
  const [addTopic, { data:add, addError, addSuccess }] = useAddTopicMutation();

  const handleUpdateTopic = (e) => {
    e.preventDefault();
    const topic = {
      id,
      title,
      description
    };

    if(id == 0){
      addTopic(topic);
    } else {
      updateTopic(topic);
    }

    
    // console.log("currentTopic update: " + JSON.stringify(topic) );
  };



  /// default value
  // quill.clipboard.dangerouslyPasteHTML(editDescription); 

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Topic.",
        description: `Updated successfully!`,
        variant: "solid",
        duration: 1500,
        isClosable: true,
        position: "top-right"
      });
    }
  }, [data, error, isSuccess]);

  React.useEffect(() => {
    if (quill) {

      // default quil data
      if(quill){
        quill.clipboard.dangerouslyPasteHTML(description); 
      }

      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef

        setDescription(quill.root.innerHTML);

      });
    }
  }, [quill]);

  // console.log("handleQuillContent: " + JSON.stringify(description) );
  
  return (
<>      
      {id ? (
        <form className='editTopic' name='updateTopic' onSubmit={handleUpdateTopic}>
            <TabPanel bg="white" boxShadow="lg" rounded="md" className='mt-3'>
              <input
              className="form-control"
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)} 
              defaultValue={editTitle}
            />

            <div 
              className='w-100 mt-2'
              style={{ height: 300 }}>
              <div 
                ref={quillRef} 
                value={description}
              />
            </div>
            
              <div
                  className='mt-5'
                >
                <ButtonGroup 
                  className='mt-4'
                  size='sm' isAttached variant='solid'>
                  <Button type="submit">Save</Button>
                  {/* <IconButton aria-label='More fields' icon={<Plus />} /> */}
                  <PopoverForm
                    icon={<Plus size={16} />}
                  />
                </ButtonGroup>
              </div>
              </TabPanel>
            </form>
      ) : "" }
        
</>
  );
};

export default TopicDetailTab;
