import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import Icon from '@/components/Icon';
import { getUser } from '@/store/actions/profile';
import { RootAction, RootState } from '@/types/store';

import styles from './index.module.scss';

type Props = StateType & DispatchType;

const Profile = ({ profile, getUser }: Props) => {
  const history = useHistory();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const { user } = profile;

  const { photo, name, art_count, follow_count, fans_count, like_count } = user;

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info">
          <div className="avatar">
            <img
              src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'}
              alt=""
            />
          </div>
          <div className="user-name">{name}</div>
          <Link to="/profile/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读
          <span>10</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>{art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="service-item" onClick={() => history.push('/chat')}>
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  );
};

type StateType = {
  profile: RootState['profile'];
};
// 作用：用来为组件提供状态，相当于 useSelector hook 的作用
const mapStateToProps = (state: RootState): StateType => {
  // 返回的内容，就表示要传递给组件的状态
  return {
    profile: state.profile,
  };
};

type DispatchType = {
  getUser: () => void;
};
// 作用：用来提供 dispatch 的函数，相当于 useDispatch hook 的作用
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, unknown, RootAction>,
): DispatchType => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

// connect 是 react-redux 提供的一个高阶组件，用来将 redux 提供的状态，以及修改状态的函数，
// 通过 props 传递给组件。这样，组件就可以通过 props 来接收到 redux 的内容
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
