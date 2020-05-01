import { combineReducers } from 'redux';

import usersReducer from './user';
import blogsReducer from './blog';

const rootReducer = combineReducers({
  users: usersReducer,
  blogs: blogsReducer,
});

export default rootReducer;
