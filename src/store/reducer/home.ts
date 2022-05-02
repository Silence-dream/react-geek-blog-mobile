import sortBy from 'lodash/sortBy';

import { Articles, Channel } from '@/types/data';
import { HomeAction } from '@/types/store';

type HomeState = {
  channels: Channel[];
  restChannels: Channel[];
  channelActiveKey: number;
  // 所有频道的文章列表数据
  channelArticles: {
    // eslint-disable-next-line no-unused-vars
    [key in number]?: Articles;
  };
};

const initialState: HomeState = {
  channels: [],
  restChannels: [],
  channelActiveKey: 0,
  channelArticles: {},
};

const home = (state = initialState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'home/getChannels':
      return {
        ...state,
        channels: action.payload,
      };
    case 'home/getRestChannels':
      return {
        ...state,
        restChannels: action.payload,
      };
    case 'home/toggleChannel':
      return {
        ...state,
        channelActiveKey: action.payload,
      };
    case 'home/delChannel':
      return {
        ...state,
        // 我的频道
        channels: state.channels.filter((item) => item.id !== action.payload.id),
        // 可选频道
        restChannels: sortBy([...state.restChannels, action.payload], 'id'),
      };
    case 'home/addChannel':
      return {
        ...state,
        channels: [...state.channels, action.payload],
        restChannels: state.restChannels.filter((item) => item.id !== action.payload.id),
      };
    // 频道文章列表数据
    case 'home/getArticleListByChannelId': {
      const {
        channelId,
        articles: { pre_timestamp, results },
      } = action.payload;

      const currentResults = state.channelArticles[channelId]?.results ?? [];

      return {
        ...state,
        // 只修改：频道文章列表数据
        channelArticles: {
          // 展开所有频道的文章列表数据
          ...state.channelArticles,
          // 只修改当前频道的文章列表数据
          [channelId]: {
            pre_timestamp,
            // 追加数据
            results: [
              ...currentResults,
              // 接口返回的最新的文章列表数据
              ...results,
            ],
          },
        },
      };
    }
    // 下拉获取最新文章列表数据
    case 'home/getNewestArticleList': {
      const {
        channelId,
        articles: { pre_timestamp, results },
      } = action.payload;
      const currentResults = state.channelArticles[channelId]?.results ?? [];
      return {
        ...state,
        channelArticles: {
          ...state.channelArticles,
          [channelId]: {
            pre_timestamp,
            results: [...results, ...currentResults],
          },
        },
      };
    }
    default:
      return state;
  }
};
export default home;
