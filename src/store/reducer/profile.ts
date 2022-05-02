import { User, UserProfile } from '@/types/data';
import { RootAction } from '@/types/store';
interface InitStateI {
  user: Partial<User>;
  userProfile: Partial<UserProfile>;
}
const initState: InitStateI = {
  user: {},
  userProfile: {},
};
const profile = (state = initState, action: RootAction) => {
  switch (action.type) {
    case 'profile/getUser':
      return { ...state, user: action.payload };
    case 'profile/getUserProfile':
      return { ...state, userProfile: action.payload };
    case 'profile/photo':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          photo: action.payload,
        },
      };
    case 'profile/update':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
export default profile;
