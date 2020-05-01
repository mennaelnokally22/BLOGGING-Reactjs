const addUser = (user) => ({
  type: 'ADD_USER',
  user,
});

const updateUser = (id, updates) => ({
  type: 'UPDATE_USER',
  id,
  updates,
});

const addFollowing = (userId, followingId) => ({
  type: 'ADD_FOLLOWING',
  userId,
  followingId,
});

const removeFollowing = (userId, followingId) => ({
  type: 'REMOVE_FOLLOWING',
  userId,
  followingId,
});

export { addUser, updateUser, addFollowing, removeFollowing };
