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
