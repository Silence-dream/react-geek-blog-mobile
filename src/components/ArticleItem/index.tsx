// 导入中文语言包
import 'dayjs/locale/zh-cn';

import { Image } from 'antd-mobile';
import classnames from 'classnames';
import dayjs from 'dayjs';
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime';

import Icon from '@/components/Icon';

import styles from './index.module.scss';
// 安装相对时间插件
dayjs.extend(relativeTime);
// 设置语言为中文
dayjs.locale('zh-cn');

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type: 0 | 1 | 3;
  title: string;
  aut_name: string;
  comm_count: number;
  pubdate: string;
  images?: string[];
};

const ArticleItem = ({ type, title, aut_name, comm_count, pubdate, images }: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt',
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images?.map((item, index) => (
              <div key={index} className="article-img-wrapper">
                <Image
                  lazy
                  src={item}
                  style={{
                    '--width': '110px',
                    '--height': '75px',
                  }}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        {/* <span>2 天前</span> */}
        <span>{dayjs().to(dayjs(pubdate))}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
