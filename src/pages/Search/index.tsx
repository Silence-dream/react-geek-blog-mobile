import { NavBar, SearchBar } from 'antd-mobile';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Icon from '@/components/Icon';
import { getSuggestion } from '@/store/actions/search';
import { RootState } from '@/types/store';

import styles from './index.module.scss';
const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  // 搜索词
  const onSearchChange = (value: string) => {
    setSearchText(value);
    if (value.trim() === '') return;
    dispatch(getSuggestion(value) as any);
  };
  const onSearch = (searchText: string) => {
    history.push(`/search/result?query=${searchText}`);
  };
  // 联想词
  const { suggestion } = useSelector((state: RootState) => state.search);
  // 高亮单词
  const highlightSuggestion = suggestion.map((item) => {
    // 处理报错
    if (item === null || item === undefined)
      return { left: null, right: null, search: null };
    const lowerCaseItem = item?.toLowerCase();
    const lowerSearchText = searchText?.toLowerCase();
    let index = lowerCaseItem?.indexOf(lowerSearchText);

    let left = lowerCaseItem?.slice(0, index);
    let right = lowerCaseItem?.slice(index + searchText.length);
    let search = lowerCaseItem?.slice(index, index + searchText.length);
    return { left, right, search };
  });
  console.log(highlightSuggestion);
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.push('/home')}
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
      <div className={classnames('search-result', suggestion.length > 0 ? 'show' : '')}>
        {highlightSuggestion.map((item, index) => (
          <div key={index} className="result-item">
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value">
              {item.left}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
