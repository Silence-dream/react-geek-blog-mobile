import { User, UserPhotoResponse, UserProfile, UserProfileResponse } from '@/types/data';
import { ProfileDispatch } from '@/types/store';
import http from '@/utils/http';
type UserResponse = {
  message: string;
  data: User;
};
// 获取用户数据
export const getUser = () => {
  return async (dispatch: ProfileDispatch) => {
    let result = await http.get<any, UserResponse>('/user');
    dispatch({ type: 'profile/getUser', payload: result.data });
  };
};
// 展示用户信息
export const getUserProfile = () => {
  return async (dispatch: ProfileDispatch) => {
    let result = await http.get<UserProfileResponse>('/user/profile');
    dispatch({ type: 'profile/getUserProfile', payload: result.data.data });
  };
};

// 更新头像
export const updatePhoto = (file: FormData) => {
  return async (dispatch: ProfileDispatch) => {
    const res = await http.patch<UserPhotoResponse>('/user/photo', file);

    // console.log(res)
    dispatch({ type: 'profile/photo', payload: res.data.data.photo });
  };
};

export const updateUserProfile = (userProfile: Partial<UserProfile>) => {
  return async (dispatch: ProfileDispatch) => {
    await http.patch('/user/profile', userProfile);

    dispatch({ type: 'profile/update', payload: userProfile });
  };
};
