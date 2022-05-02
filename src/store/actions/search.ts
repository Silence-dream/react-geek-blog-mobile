import { SuggestionResponse } from '@/types/data';
import { SearchAction, SearchDispatch } from '@/types/store';
import http from '@/utils/http';

// 获取联想关键词
export const getSuggestion = (q: string) => {
  return async (dispatch: SearchDispatch) => {
    const res = await http.get<SuggestionResponse>('/suggestion', {
      params: {
        q,
      },
    });
    dispatch({ type: 'search/suggestion', payload: res.data.data.options });
  };
};
// 清空联想
export const clearSuggestion = (): SearchAction => {
  return { type: 'search/clearSuggestion' };
};
