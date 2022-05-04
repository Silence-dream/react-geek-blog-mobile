/* eslint-disable */
import Icon from '@/components/Icon';

import styles from './index.module.scss';

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply';
  // 评论数量
  comm_count?: number;
  // 评论图标的点击事件
  onShowComment?: () => void;
  // 是否收藏的状态
  is_collected?: boolean;
  // 收藏按钮的点击事件
  onCollected?: () => void;
  // 是否点赞
  attitude?: number;
  // 是否点赞
  onLike?: () => void;
  // 展示文章评论弹出层的回调
  onShowArticleComment?: () => void;
  // 评论的 placeholder
  placeholder?: string;
};

const CommentFooter = ({
  placeholder = '抢沙发',
  type = 'normal',
  comm_count,
  onShowComment,
  is_collected,
  onCollected,
  attitude,
  onLike,
  onShowArticleComment,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onShowArticleComment}>
        <Icon type="iconbianji" />
        <span>{placeholder}</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {comm_count !== 0 && <span className="bage">{comm_count}</span>}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollected}>
            <Icon type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item" onClick={onLike}>
          <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
