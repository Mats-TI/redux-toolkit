import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCategoriesQuery } from './categoryApi';
// import Select from "react-select";
import { Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CategoriesList = ({ currentCategory, categoryChangeHandler, selection }) => {

  const { data, error, isLoading, isSuccess } = useCategoriesQuery();
  const categoriesFinal = [{id:'', title:'All categories'}, ...new Set(data)];

  let content = categoriesFinal.map(({ id, title}) => ({
    value : id, label: title 
  }))
  
  // console.log("content: " + JSON.stringify(content) );

  return (
  <>
      <div className='isErrorIsLoading'>
        {error && <p>An error occured</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      {isSuccess && (    
        <div style={{padding: 20}}>
          <Select
            defaultValue="All categories"
            style={{
              width: 120,
            }}
            onChange={categoryChangeHandler}
            allowClear
            options={content}
          /> 
          <Tooltip title="Create new category">
            <Button className="mr-2 text-muted" icon={<PlusOutlined />}>Create category</Button>
          </Tooltip>
        </div>
      )}
      
  </>
  );


};

export default CategoriesList;
