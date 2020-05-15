import { combineReducers } from 'redux';

import blogsReducer from './blog';
import searchReducer from './search';
import authReducer from './auth';

const rootReducer = combineReducers({
  blogs: blogsReducer,
  search: searchReducer,
  auth: authReducer,
});

export default rootReducer;
