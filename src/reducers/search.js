const searchReducerDefaultState = {
  searchText: '',
  activeFilter: 1,
};

const searchReducer = (state = searchReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.searchText };
    case 'SET_ACTIVE_FILTER':
      return { ...state, activeFilter: action.activeFilter };
    default:
      return state;
  }
};

export default searchReducer;
