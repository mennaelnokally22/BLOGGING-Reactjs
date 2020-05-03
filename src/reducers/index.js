import { combineReducers } from 'redux';

import usersReducer from './user';
import blogsReducer from './blog';
import searchReducer from './search';

const rootReducer = combineReducers({
  users: usersReducer,
  blogs: blogsReducer,
  search: searchReducer,
});

export default rootReducer;
