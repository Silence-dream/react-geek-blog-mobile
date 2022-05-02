import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@/components/Icon';
import {
  addChannel,
  delMyChannel,
  getRestChannels,
  toggleChannel,
} from '@/store/actions/home';
import { Channel } from '@/types/data';
import { RootState } from '@/types/store';
import { useInitialState } from '@/utils/use-initial-state';

import styles from './index.module.scss';

type Props = {
  onClose: () => void;
};

const Channels = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  // 是否为编辑状态
  const [isEdit, setIsEdit] = useState(false);
  const { channels, channelActiveKey } = useSelector((state: RootState) => state.home);

  const { restChannels } = useInitialState(getRestChannels, 'home');

  // 切换编辑状态
  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  // 切换频道
  const onChannelClick = (channel: Channel) => {
    if (!isEdit) {
      // 不是编辑状态，就执行切换频道操作
      dispatch(toggleChannel(channel.id) as any);
      onClose();
    } else {
      // 是编辑状态，执行删除频道操作
      // 判断是否为推荐频道 或 长度小于等于4
      if (channel.id === 0) return;
      if (channels.length <= 4) return;
      // 如果是当前选中项也不允许删除
      if (channel.id === channelActiveKey) return;

      dispatch(delMyChannel(channel) as any);
    }
  };

  // 添加频道
  const onAddChannel = (channel: Channel) => {
    dispatch(addChannel(channel) as any);
  };

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classNames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
            <span role="button" className="channel-item-edit" onClick={changeEdit}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <span
                key={item.id}
                className={classNames(
                  'channel-list-item',
                  channelActiveKey === item.id && 'selected',
                )}
                onClick={() => onChannelClick(item)}
              >
                {item.name}
                {/* 排除 推荐 以及 当前选中项的 删除的图标 */}
                {item.id !== 0 && item.id !== channelActiveKey && (
                  <Icon type="iconbtn_tag_close" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">可选频道</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannels.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => onAddChannel(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
