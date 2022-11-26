import React from 'react';
  import { Filter } from 'react-feather';
  import  FocusLock from "react-focus-lock";
  import { Select, Button, Popover } from 'antd';

  const PopoverForm = ({ icon }) => {

    const handleFilterPostStatus = (value) => {
      console.log(`selected ${value}`);
    };

    const handleFilterPostType = (value) => {
      console.log(`selected ${value}`);
    };

    const popOverContent = (
      <div>
          <Select
                defaultValue="0"
                style={{
                  width: 120,
                }}
                onChange={handleFilterPostStatus}
                options={[
                  {
                    value: '0',
                    label: 'Post Status',
                  },
                  {
                    value: 'Pending',
                    label: 'Pending',
                  },
                  {
                    value: 'Approved',
                    label: 'Approved',
                  },
                  {
                    value: 'Published',
                    label: 'Published',
                  },
                  {
                    value: 'In Progress',
                    label: 'In Progress',
                  },
                  {
                    value: 'Awaiting Review',
                    label: 'Awaiting Review',
                  },
                ]}
              />
              <br/>
              <Select
                className='mt-1'
                defaultValue="0"
                style={{
                  width: 120,
                }}
                onChange={handleFilterPostType}
                options={[
                  {
                    value: '0',
                    label: 'Post Type',
                  },
                  {
                    value: 'Page',
                    label: 'Page',
                  },
                  {
                    value: 'Post',
                    label: 'Post',
                  },
                  {
                    value: 'Ad',
                    label: 'Ad',
                  },
                ]}
              />
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