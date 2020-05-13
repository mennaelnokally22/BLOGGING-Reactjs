import axios from 'axios';

const addUser = (user) => ({
  type: 'ADD_USER',
  user,
});

const signUp = (user) => {
  return async (dispatch) => {
    const data = await axios.post('http://localhost:3000/user/register', user);
    //dispatch(addUser(user));
    return data;
  };
};

const updateUser = (id, updates) => ({
  type: 'UPDATE_USER',
  id,
  updates,
});

// const addFollowing = (userId, followingId) => ({
//   type: 'ADD_FOLLOWING',
//   userId,
//   followingId,
// });

// const removeFollowing = (userId, followingId) => ({
//   type: 'REMOVE_FOLLOWING',
//   userId,
//   followingId,
// });
const toggleFollowing = (userId, followingId) => ({
  type: 'TOGGLE_FOLLOWING',
  userId,
  followingId,
});
export { signUp, updateUser, toggleFollowing };
