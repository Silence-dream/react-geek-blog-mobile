/* eslint-disable */
import { NavBar, Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';

import NoneComment from '@/components/NoneComment';
import {
  AddArticleCommnetResponse,
  ArtComment,
  ArticleComment,
  ArticleCommentResponse,
} from '@/types/data';
import http from '@/utils/http';

import CommentFooter from '../CommentFooter';
import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';
import styles from './index.module.scss';

type Props = {
  onClose: (commentId: string, total: number) => void;
  // 评论项类型
  commentItem: ArtComment;
  // 通知父组件修改评论数据的回调函数
  onReplyThumbUp: (com_id: string, is_liking: boolean) => void;
  // 文章id
  articleId: string;
};

const Reply = ({ onClose, commentItem, onReplyThumbUp, articleId }: Props) => {
  // 根据父组件中传递过来的 props ，创建一个状态，让其变为当前组件自己状态
  const [comment, setComment] = useState(commentItem);
  // 控制回复文本框弹出层的展示和隐藏
  const [showPopup, setShowPopup] = useState(false);
  // 评论的回复列表数据
  const [reply, setReply] = useState<ArticleComment>({
    // 注意：为了防止第一次进入时，访问 reply.results.length 不报错，需要在此处给它设置默认值为：[]
    results: [] as ArtComment[],
    last_id: null,
    end_id: null,
    total_count: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await http.get<ArticleCommentResponse>('/comments', {
        params: {
          type: 'c',
          source: comment.com_id,
        },
      });

      setReply(res.data.data);
    };
    loadData();
  }, [comment.com_id]);

  // 对评论进行点赞
  const onThumbUp = async () => {
    if (comment.is_liking) {
      // 说明：当前是点赞的，此时，要取消点赞
      await http.delete(`/comment/likings/${comment.com_id}`);
    } else {
      // 说明：当前是未点赞，此时，要点赞
      await http.post('/comment/likings', {
        target: comment.com_id,
      });
    }

    setComment({
      ...comment,
      is_liking: !comment.is_liking,
      like_count: comment.is_liking ? comment.like_count - 1 : comment.like_count + 1,
    });

    // 将修改后的评论数据，传递给父组件，然后，由父组件来修改该数据
    onReplyThumbUp(comment.com_id, comment.is_liking);
  };

  const onReplyPopupHide = () => setShowPopup(false);

  // 对评论进行回复
  const onAddComment = async (value: string) => {
    const res = await http.post<AddArticleCommnetResponse>('/comments', {
      target: comment.com_id,

      content: value,
      art_id: articleId,
    });

    // 将最新发表的评论数据，添加到回复列表中即可
    setReply({
      ...reply,
      // 发表评论后，让评论数量加1
      total_count: reply.total_count + 1,
      results: [res.data.data.new_obj, ...reply.results],
    });

    onReplyPopupHide();
  };

  // 关闭对回复弹出层，将当前评论的总数量传递给父组件
  const onBackToArticle = () => {
    onClose(comment.com_id, reply.total_count);
  };

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onBack={onBackToArticle}>
          {reply.results.length} 条回复
        </NavBar>

        {/* 要回复的评论 */}
        <div className="origin-comment">
          <CommentItem type="origin" {...comment} onThumbUp={onThumbUp} />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {reply.results.length > 0 ? (
            reply.results.map((item) => (
              <CommentItem key={item.com_id} type="reply" {...item} />
            ))
          ) : (
            <NoneComment />
          )}
        </div>

        <CommentFooter
          placeholder="去评论"
          type="reply"
          onShowArticleComment={() => setShowPopup(true)}
        />
      </div>

      {/* 回复文本框对应的抽屉 */}

      <Popup className="reply-popup" position="bottom" visible={showPopup}>
        <CommentInput
          name={comment.aut_name}
          onAddComment={onAddComment}
          onClose={onReplyPopupHide}
        />
      </Popup>
    </div>
  );
};

export default Reply;
