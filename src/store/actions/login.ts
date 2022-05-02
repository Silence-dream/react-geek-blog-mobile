// 创建 登录 的 action

import { LoginResponse } from '@/types/data';
import { LoginDispatch } from '@/types/store';
import http from '@/utils/http';
import { clearToken, setToken } from '@/utils/token';

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

// 发送验证码
export const getCode = (mobile: string) => {
  return async () => {
    let result = await http.get(`/sms/codes/${mobile}`);
    console.log(result);
  };
};

// 退出
export const logout = () => {
  return (dispatch: LoginDispatch) => {
    // 清空本地缓存中 token
    clearToken();
    // 清空 redux 中存储的 token
    dispatch({ type: 'login/logout' });
  };
};
