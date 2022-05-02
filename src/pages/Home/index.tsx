import { Popup, Tabs } from 'antd-mobile';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Icon from '@/components/Icon';
import { getChannels, toggleChannel } from '@/store/actions/home';
import { useInitialState } from '@/utils/use-initial-state';

import Channels from './Channels';
import ArticleList from './components/ArticleList';
import styles from './index.module.scss';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [channelVisible, setChannelVisible] = useState(false);
  const { channels, channelActiveKey } = useInitialState(getChannels, 'home');

  // 频道管理弹出层展示
  const onChannelShow = () => setChannelVisible(true);

  // 频道管理弹出层隐藏
  const onChannelHide = () => setChannelVisible(false);

  // 切换 tab
  const changeTab = (key: string) => {
    dispatch(toggleChannel(Number(key)) as any);
  };

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {channels.length > 0 && (
        <Tabs
          className="tabs"
          activeLineMode="fixed"
          activeKey={channelActiveKey + ''}
          onChange={changeTab}
        >
          {channels.map((item) => (
            <Tabs.Tab forceRender title={item.name} key={item.id}>
              <ArticleList channelId={item.id} />
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={onChannelShow} />
      </div>

      {/* 频道管理 - 弹出层 */}
      <Popup visible={channelVisible} className="channel-popup" position="left">
        <Channels onClose={onChannelHide} />
      </Popup>
    </div>
  );
};

export default Home;
