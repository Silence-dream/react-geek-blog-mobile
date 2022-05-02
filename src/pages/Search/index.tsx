import { NavBar, SearchBar } from 'antd-mobile';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';
const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const onSearchChange = (value: string) => {
    setSearchText(value);
  };
  const onSearch = (searchText: string) => {
    history.push(`/search/result?query=${searchText}`);
  };

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span className="search-text" onClick={() => onSearch(searchText)}>
            搜索
          </span>
        }
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={searchText}
          onChange={onSearchChange}
        />
      </NavBar>
    </div>
  );
};
export default SearchPage;
