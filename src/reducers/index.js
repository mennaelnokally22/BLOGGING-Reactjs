import { combineReducers } from 'redux';

import usersReducer from './user';
import blogsReducer from './blog';
import searchReducer from './search';
import authReducer from './auth';

const rootReducer = combineReducers({
  users: usersReducer,
  blogs: blogsReducer,
  search: searchReducer,
  auth: authReducer,
});

export default rootReducer;
