import { NavBar } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleItem from '@/components/ArticleItem';
import http from '@/utils/http';

import styles from './index.module.scss';
export default function Result() {
  const history = useHistory();
  const location = useLocation();
  const [searcgList, setSearchList] = useState<any>([]);
  // 获取参数
  const params = new URLSearchParams(location.search);
  let query = params.get('query') ?? '';
  console.log(query);
  useEffect(() => {
    http
      .get('/search', {
        params: { q: query },
      })
      .then((res) => {
        console.log(res.data.data.results);
        setSearchList(res.data.data.results);
      });
  }, [query]);

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.push('/search')}>搜索结果</NavBar>
      <div className="article-list">
        {searcgList.map((item: any, index: any) => {
          const {
            title,
            pubdate,
            comm_count,
            aut_name,
            art_id,
            cover: { type, images },
          } = item;
          const articleData = {
            title,
            pubdate,
            comm_count,
            aut_name,
            type,
            images,
          };
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              key={index}
              className="article-item"
              onClick={() => history.push(`/articles/${art_id}`)}
            >
              <ArticleItem {...articleData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
