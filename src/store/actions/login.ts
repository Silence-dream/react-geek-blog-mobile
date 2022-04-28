// 创建 登录 的 action

import { LoginResponse } from '@/types/data';
import { LoginDispatch } from '@/types/store';
import http from '@/utils/http';
import { setToken } from '@/utils/token';

type LoginParams = {
  mobile: string;
  code: string;
};

export const login = (data: LoginParams) => {
  return async (dispatch: LoginDispatch) => {
    // 为该接口的返回值指定类型
    const res = await http.post<LoginResponse>('/authorizations', {
      mobile: data.mobile,
      code: data.code,
    });
    const { data: token } = res.data;
    // 将 token 数据存储到本地缓存中
    setToken(token);
    // 分发 action 将 token 存储到 redux 中
    dispatch({ type: 'login/token', payload: token });
  };
};
