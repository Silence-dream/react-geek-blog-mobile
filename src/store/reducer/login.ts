import { Token } from '@/types/data';
import { LoginAction } from '@/types/store';

const initialState: Token = {
  token: '',
  refresh_token: '',
};
export const login = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case 'login/token':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default login;
