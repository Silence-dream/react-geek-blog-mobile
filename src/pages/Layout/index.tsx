import { TabBar } from 'antd-mobile';
import { Route, useHistory, useLocation } from 'react-router-dom';

import Icon from '@/components/Icon';

// 导入页面组件，配置路由
import Home from '../Home';
import Profile from '../Profile';
import Question from '../Question';
import Video from '../Video';
import styles from './index.module.scss';

const tabs = [
  { path: '/home/index', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
];

const Layout = () => {
  const localtion = useLocation();
  const history = useHistory();
  // 切换路由
  function changeRoute(key: string) {
    history.push(key);
  }
  return (
    <div className={styles.root}>
      <Route exact path="/home/index">
        <Home></Home>
      </Route>
      <Route path="/home/question">
        <Question></Question>
      </Route>
      <Route path="/home/video">
        <Video></Video>
      </Route>
      <Route path="/home/profile">
        <Profile></Profile>
      </Route>

      <TabBar
        className="tab-bar"
        activeKey={localtion.pathname}
        onChange={(key) => changeRoute(key)}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default Layout;
