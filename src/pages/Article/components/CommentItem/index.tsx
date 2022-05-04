/* eslint-disable */
import classnames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Icon from '@/components/Icon';
import { ArtComment } from '@/types/data';

import styles from './index.module.scss';

// 安装 dayjs 相对日期插件
dayjs.extend(relativeTime);

// 该组件接收到的属性的类型包含了两部分：
// 1 评论项的类型
// 2 事件、type 等其他数据类型
type Props = Partial<ArtComment> & {
  // normal 普通 - 文章的评论
  // origin 回复评论的原始评论，也就是对哪个评论进行回复
  // reply 回复评论
  type?: 'normal' | 'reply' | 'origin';
  // 点赞或取消点赞
  onThumbUp?: () => void;
  // 展示评论回复弹出层的回调
  onReplyShow?: () => void;
};

const CommentItem = ({
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type = 'normal',
  aut_photo,
  aut_name,
  content,
  pubdate,
  is_liking,
  like_count,
  reply_count,
  onThumbUp,
  onReplyShow,
  is_followed,
}: Props) => {
  // 回复按钮
  const replyJSX =
    type === 'normal' ? (
      <span className="replay" onClick={onReplyShow}>
        {reply_count !== 0 && reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null;

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src={aut_photo || 'http://geek.itheima.net/images/user_head.jpg'} alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{aut_name}</span>
          {/* 文章评论、评论的回复 */}
          {(type === 'normal' || type === 'reply') && (
            <span className="thumbs-up" onClick={onThumbUp}>
              {like_count}
              <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === 'origin' && (
            <span className={classnames('follow', is_followed ? 'followed' : '')}>
              {is_followed ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {type !== 'reply' && (
            <span className="comment-time">{dayjs().from(pubdate)}</span>
          )}
          {/* 文章的评论 */}
          {type === 'origin' && (
            <span className="thumbs-up" onClick={onThumbUp}>
              {like_count}
              <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
