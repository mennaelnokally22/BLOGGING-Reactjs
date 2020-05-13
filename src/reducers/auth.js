const authReducerDefaultSatate = {
  token: null,
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  followingUsers: null,
};

const authenticationReducer = (state = authReducerDefaultSatate, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...action.userData };
    case 'FOLLOW_USER':
      const isFollowing = state.followingUsers.includes(action.followingId);
      const newFollows = isFollowing
        ? state.followingUsers.filter((id) => id !== action.followingId)
        : [...state.followingUsers, action.followingId];

      return {
        ...state,
        followingUsers: newFollows,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
