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

// Home 数据
export type Channel = {
  id: number;
  name: string;
};
export type UserChannel = {
  channels: Channel[];
};
export type UserChannelResponse = ApiResponse<UserChannel>;
// 文章列表数据的类型
export type Article = {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  // 接口返回的值 number 类型
  comm_count: number;
  pubdate: string;
  cover: {
    type: 0 | 1 | 3;
    images: string[];
  };
};
export type Articles = {
  // 接口文档是 数值类型，但是接口真实返回的数据：string 或 null
  // 如果还有更多文章列表数据，那么，返回 string 类型的时间戳
  // 如果没有更多文章列表数据了，那么，就返回 null
  pre_timestamp: string | null;
  results: Article[];
};
export type ArticlesResponse = ApiResponse<Articles>;

// 我的频道数据的类型
export type ChannelList = {
  channels: Channel[];
};
export type ChannelResponse = ApiResponse<ChannelList>;

// 搜索联想关键词
export type Suggestion = {
  options: string[];
};
export type SuggestionResponse = ApiResponse<Suggestion>;
// 搜索结果
export type SuggestionResult = {
  page: number;
  per_page: number;
  results: Article[];
  total_count: number;
};
export type SuggestionResultResponse = ApiResponse<SuggestionResult>;
