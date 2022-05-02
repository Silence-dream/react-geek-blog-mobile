// 登录接口返回数据类型
export type Token = {
  token: string;
  refresh_token: string;
};

// axios 请求的响应类型
type ApiResponse<Data> = {
  message: string;
  data: Data;
};
// 接口返回的数据类型：
export type LoginResponse = ApiResponse<Token>;

// 我的 - 个人信息
export type User = {
  id: string;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};

// 用户 Profile
export type UserResponse = ApiResponse<User>;
// Profile 返回的数据
export type UserProfile = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthday: string;
  intro: string;
};
export type UserProfileResponse = ApiResponse<UserProfile>;

// 修改头像
export type UserPhoto = {
  // 接口文档中有该属性，但是，接口返回的数据中没有
  // id: string
  photo: string;
};
export type UserPhotoResponse = ApiResponse<UserPhoto>;
