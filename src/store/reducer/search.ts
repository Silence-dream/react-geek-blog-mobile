import { Suggestion, SuggestionResult } from '@/types/data';
import { SearchAction } from '@/types/store';
type SearchState = {
  suggestion: Suggestion['options'];
  suggestionResult: SuggestionResult;
};

const initialState: SearchState = {
  suggestion: [],
  // 此处，为该对象，初始化默认值
  suggestionResult: {
    page: 1,
    per_page: 10,
    total_count: 0,
    results: [],
  },
};

const search = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case 'search/suggestion':
      return {
        ...state,
        suggestion: action.payload,
      };
    case 'search/clearSuggestion':
      return {
        ...state,
        suggestion: [],
      };
    default:
      return state;
  }
};

export default search;
