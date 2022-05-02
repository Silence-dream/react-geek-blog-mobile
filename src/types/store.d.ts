// import { ThunkAction } from 'redux-thunk';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import store from '@/store';

import {
  Articles,
  Channel,
  Suggestion,
  SuggestionResult,
  Token,
  User,
  UserProfile,
} from './data';

type RootState = ReturnType<typeof store.getState>;
// 使用 thunk 中间件后的 Redux dispatch 类型
// ReturnType：thunk action 的返回类型
// State: Redux 的状态  RootState
// ExtraThunkArg: 额外的参数，没有用到，可以指定为 unknown
// BasicAction: 非 thunk action，即对象形式的 action

// export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;

// 项目中所有 action 的类型
type RootAction = LoginAction | ProfileActionI | HomeAction;

// thunk action 类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;

type LoginAction =
  | {
      type: 'login/token';
      payload: Token;
    }
  | {
      type: 'login/logout';
    };

export type LoginDispatch = Dispatch<LoginAction>;

// Profile 用户信息类型

export type ProfileActionI =
  | {
      type: 'profile/getUser';
      payload: User;
    }
  | {
      type: 'profile/getUserProfile';
      payload: UserProfile;
    }
  | { type: 'profile/photo'; payload: string }
  | {
      type: 'profile/update';
      payload: Partial<UserProfile>;
    };
export type ProfileDispatch = Dispatch<ProfileActionI>;

// 首页相关类型
type HomeAction =
  // 使用字符串模板来优化字面类型
  | {
      type: `home/${'getChannels' | 'getRestChannels'}`;
      payload: Channel[];
    }
  | {
      type: 'home/toggleChannel';
      payload: number;
    }
  | {
      type: `home/${'delChannel' | 'addChannel'}`;
      payload: Channel;
    }
  | {
      type: `home/${'getArticleListByChannelId' | 'getNewestArticleList'}`;
      payload: {
        channelId: number;
        articles: Articles;
      };
    };

// 搜索相关的 action 类型
export type SearchAction =
  | {
      type: 'search/suggestion';
      payload: Suggestion['options'];
    }
  | {
      type: 'search/clearSuggestion';
    }
  | {
      type: 'search/getSuggestionResult';
      payload: SuggestionResult;
    };
export type SearchDispatch = Dispatch<SearchAction>;
