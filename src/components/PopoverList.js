import React from 'react';
import { useDisclosure } from '@chakra-ui/react'
import {
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Stack,
    IconButton,

  } from '@chakra-ui/react';
  import  FocusLock from "react-focus-lock";
  import { Button, Popover, Checkbox } from 'antd';
  import { EditOutlined } from '@ant-design/icons';


  // 3. Create the Popover
  const PopoverForm = ({ icon }) => {

    const plainOptions = ['best', 'nice', 'worthy', 'decent', 'ethical'];
    const onChange = (checkedValues) => {
      console.log('checked = ', checkedValues);
    };

    const popOverContent = (
      <div>
          Word: <span contentEditable="true">good</span><br/>
          Meanings: <Checkbox.Group options={plainOptions} defaultValue={['nice']} onChange={onChange} />
      </div>
    );
  
    return (
      <>
        <Popover placement="right" content={popOverContent} trigger="click">
          <Button size="small" type="text" icon={icon}></Button>
        </Popover>
      </>
    )
  }
  
  export default PopoverForm;
//   render(<PopoverForm />)