import { NavBar, SearchBar } from 'antd-mobile';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Icon from '@/components/Icon';
import { clearSuggestion, getSuggestion } from '@/store/actions/search';
import { RootState } from '@/types/store';
const GEEK_SEARCH_KEY = 'geek-search-history';
import { useDebounceFn } from 'ahooks';

import styles from './index.module.scss';
const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  // 防抖 hooks
  const { run } = useDebounceFn(
    (value) => {
      dispatch(getSuggestion(value) as any);
    },
    {
      wait: 300,
      maxWait: 500,
    },
  );
  // 搜索词
  const onSearchChange = (value: string) => {
    setSearchText(value);
    if (value.trim() === '') return;
    run(value);
  };
  const onSearch = (searchText: string) => {
    history.push(`/search/result?query=${searchText}`);
    // 清空搜索联想
    dispatch(clearSuggestion());
    // 保存搜索记录
    saveHistories(searchText);
  };
  // 联想词
  const { suggestion } = useSelector((state: RootState) => state.search);
  // 高亮单词
  const highlightSuggestion = suggestion.map((item) => {
    // 处理报错
    if (item === null || item === undefined) return { left: '', right: '', search: '' };
    const lowerCaseItem = item?.toLowerCase();
    const lowerSearchText = searchText?.toLowerCase();
    let index = lowerCaseItem?.indexOf(lowerSearchText);

    let left = lowerCaseItem?.slice(0, index);
    let right = lowerCaseItem?.slice(index + searchText.length);
    let search = lowerCaseItem?.slice(index, index + searchText.length);
    return { left, right, search };
  });
  // 搜索记录
  function saveHistories(value: string) {
    const localHistories = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]',
    ) as string[];
    let histories = [];

    if (localHistories.length === 0) {
      // 没有
      histories = [value];
    } else {
      // 有
      const exist = localHistories.indexOf(value) >= 0;
      if (exist) {
        // 存在
        const leftHistories = localHistories.filter((item) => item !== value);
        histories = [value, ...leftHistories];
      } else {
        // 不存在
        histories = [value, ...localHistories];
      }
    }

    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(histories));
  }
  // 搜索历史
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  useEffect(() => {
    const histories = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]',
    ) as string[];

    setSearchHistory(histories);
  }, []);

  // 删除历史记录
  const onDeleteHistory = (value: string) => {
    const newSearchHistory = searchHistory.filter((item) => item !== value);
    setSearchHistory(newSearchHistory);
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newSearchHistory));
  };
  // 清空历史记录
  const onClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(GEEK_SEARCH_KEY);
  };
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
      {/* 搜索联想 */}
      <div className={classnames('search-result', suggestion.length > 0 ? 'show' : '')}>
        {highlightSuggestion.map((item, index) => (
          <div key={index} className="result-item">
            <Icon className="icon-search" type="iconbtn_search" />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              className="result-value"
              onClick={() => onSearch(item.left + item.search + item.right)}
            >
              {item.left}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
      {/*历史记录 和 搜索联想关键词列表 是二选一，所以，此处判断是否有 联想关键词列表 如果没有就展示历史记录*/}
      {/* 搜索历史 */}
      {suggestion.length <= 0 && (
        <div
          className="history"
          style={{
            display: suggestion.length > 0 ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span onClick={onClearHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>
          <div className="history-list">
            {searchHistory.map((item, index) => (
              <div key={index} className="history-item">
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" onClick={() => onDeleteHistory(item)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchPage;
