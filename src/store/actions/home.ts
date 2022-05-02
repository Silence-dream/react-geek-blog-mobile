import differenceBy from 'lodash/differenceBy';

import { ArticlesResponse, Channel, ChannelResponse } from '@/types/data';
import { RootThunkAction } from '@/types/store';
import http from '@/utils/http';

// 本地存储 频道 的 key
const CHANNEL_KEY = 'geek-h5-channels';
export const getChannels = (): RootThunkAction => {
  return async (dispatch, getState) => {
    /*
      1. 在该 action 中，判断用户是否登录
      2. 如果已登录，发送请求获取用户的频道列表数据
      3. 如果未登录，先判断本地缓存中有没有频道列表数据
      4. 如果有，拿到本地的频道列表数据
      5. 如果没有，就发送请求获取默认的频道列表数据，并存储到本地缓存中
    */
    const {
      login: { token },
    } = getState();
    // 1. 在该 action 中，判断用户是否登录
    if (token) {
      // 2. 如果已登录，发送请求获取用户的频道列表数据
      const res = await http.get<ChannelResponse>('/user/channels');
      // console.log('已登录', res)
      dispatch({ type: 'home/getChannels', payload: res.data.data.channels });
    } else {
      // 3. 如果未登录，先判断本地缓存中有没有频道列表数据
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]',
      ) as Channel[];
      if (localChannels.length === 0) {
        // 5. 如果没有，就发送请求获取默认的频道列表数据，并存储到本地缓存中
        const res = await http.get<ChannelResponse>('/user/channels');
        // console.log('未登录', res)
        const channels = res.data.data.channels;
        localStorage.setItem(CHANNEL_KEY, JSON.stringify(res.data.data.channels));
        dispatch({ type: 'home/getChannels', payload: channels });
      } else {
        // 4. 如果有，拿到本地的频道列表数据
        // console.log('本地已有频道数据：', localChannels)

        dispatch({ type: 'home/getChannels', payload: localChannels });
      }
    }
  };
};

// 获取可选频道数据
export const getRestChannels = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      home: { channels },
    } = getState();
    const res = await http.get<ChannelResponse>('/channels');

    // 通过 differenceBy 方法，从 第一个参数 中 排除掉 第二个参数的数据
    const restChannels = differenceBy(res.data.data.channels, channels, 'id');

    dispatch({ type: 'home/getRestChannels', payload: restChannels });
  };
};

// 切换频道高亮
export const toggleChannel = (id: number): RootThunkAction => {
  return (dispatch) => {
    dispatch({ type: 'home/toggleChannel', payload: id });
  };
};

// 删除我的频道项
export const delMyChannel = (channel: Channel): RootThunkAction => {
  return (dispatch, getState) => {
    const {
      login: { token },
    } = getState();
    // 判断是否登录
    if (token) {
      // 如果登录，就删除接口中的数据
      http.delete(`/user/channels/${channel.id}`);
    } else {
      // 如果未登录，就删除本地的数据
      // 从本地缓存中取出 频道数据
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]',
      ) as Channel[];
      // 然后，从频道数据中，删除该项，然后，存回到本地缓存中
      const newChannels = localChannels.filter((item) => item.id !== channel.id);
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newChannels));
    }

    dispatch({ type: 'home/delChannel', payload: channel });
  };
};

// 添加频道
export const addChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      login: { token },
    } = getState();
    if (token) {
      // 登录
      await http.patch('/user/channels', {
        channels: [channel],
      });
    } else {
      // 未登录
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]',
      ) as Channel[];
      const newChannels = [...localChannels, channel];
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newChannels));
    }

    dispatch({ type: 'home/addChannel', payload: channel });
  };
};

// 获取频道对应的文章列表数据
export const getArticleListByChannelId = (
  channelId: number,
  timestamp: string | null,
): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticlesResponse>('/articles', {
      params: {
        channel_id: channelId,
        timestamp,
      },
    });

    dispatch({
      type: 'home/getArticleListByChannelId',
      payload: {
        channelId,
        articles: res.data.data,
      },
    });
  };
};

// 下拉获取最新的文章列表数据
export const getNewestArticleList = (
  channelId: number,
  timestamp: string | null,
): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticlesResponse>('/articles', {
      params: {
        channel_id: channelId,
        timestamp,
      },
    });

    dispatch({
      type: 'home/getNewestArticleList',
      payload: {
        channelId,
        articles: res.data.data,
      },
    });
  };
};
