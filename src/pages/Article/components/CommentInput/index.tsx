/* eslint-disable */
import { NavBar, TextArea } from 'antd-mobile';
import { TextAreaRef } from 'antd-mobile/es/components/text-area';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

// 该组件的两个使用场景：1 文章评论  2 评论回复

type Props = {
  // 对评论回复时，需要传入该属性
  name?: string;
  onClose?: () => void;
  // 发表评论
  onAddComment: (value: string) => void;
};

const CommentInput = ({ name, onClose, onAddComment }: Props) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  const onChange = (value: string) => {
    setValue(value);
  };

  const onAdd = () => {
    onAddComment(value);
    setValue('');
  };

  return (
    <div className={styles.root}>
      <NavBar
        onBack={onClose}
        right={
          <span className="publish" onClick={onAdd}>
            发表
          </span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {name && <div className="at">@{name}:</div>}
        <TextArea
          ref={textAreaRef}
          placeholder="说点什么~"
          rows={10}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CommentInput;
