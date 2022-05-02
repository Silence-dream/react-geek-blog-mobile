import { Input, NavBar, TextArea } from 'antd-mobile';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';

// 为 EditInput 组件指定 props 类型
type Props = {
  onClose: () => void;
  value: string;
  type: '' | 'name' | 'intro';
  // eslint-disable-next-line no-unused-vars
  onUpdateProfile: (type: 'name' | 'intro', value: string) => void;
};

const EditInput = ({ onClose, value, onUpdateProfile, type }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  // 通过该代码可以验证组件有没有卸载
  useEffect(() => {
    return () => {
      console.log('组件卸载了');
    };
  }, []);

  // 创建变量，用来表示是否为修改昵称
  const isEditName = type === 'name';
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span
            className="commit-btn"
            onClick={() => {
              if (type === '') return;
              onUpdateProfile(type, inputValue);
            }}
          >
            提交
          </span>
        }
        onBack={onClose}
      >
        编辑{isEditName ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isEditName ? '昵称' : '简介'}</h3>

        {isEditName ? (
          <div className="input-wrap">
            <Input
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              placeholder="请输入"
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入内容"
            value={inputValue}
            onChange={(value) => setInputValue(value)}
            rows={4}
            maxLength={100}
            showCount
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
