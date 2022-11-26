import React from "react"
import { Input } from 'antd';
const SearchBar = ({ value, onChange }) => {
    const { Search } = Input;

  return (
    <Search
        placeholder="search topics"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        allowClear
        style={{
        width: 200,
        }}
    />
  )
}
export default SearchBar