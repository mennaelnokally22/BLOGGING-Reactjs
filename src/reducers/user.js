const userReducerDefaultState = [
  {
    id: 1,
    firstName: 'Menna',
    lastName: 'Elnoqally',
    email: 'menna.elnoqally@gmail.com',
    password: '021251454',
    followingUsers: [2, 3],
  },
  {
    id: 2,
    firstName: 'Menna2',
    lastName: 'Elnoqally',
    email: 'menna2.elnoqally@gmail.com',
    password: '021251454',
    followingUsers: [1, 3],
  },
  {
    id: 3,
    firstName: 'Menna3',
    lastName: 'Elnoqally',
    email: 'menna3.elnoqally@gmail.com',
    password: '021251454',
    followingUsers: [2, 1],
  },
];

const usersReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat(action.user);
    case 'UPDATE_USER':
      return state.map((user) =>
        user.id !== action.id ? user : { ...user, ...action.updates }
      );
    // case 'ADD_FOLLOWING':
    //   return state.map((user) =>
    //     user.id !== action.userId
    //       ? user
    //       : { ...user, ...user.followingUsers.concat(action.followingId) }
    //   );
    // case 'REMOVE_FOLLOWING':
    //   return state.map((user) =>
    //     user.id !== action.userId
    //       ? user
    //       : {
    //           ...user,
    //           ...user.followingUsers.filter((id) => id !== action.followingId),
    //         }
    //   );
    case 'TOGGLE_FOLLOWING':
      const user = state.find((user) => user.id === action.userId);
      if (!user.followingUsers.includes(action.followingId)) {
        user.followingUsers.push(action.followingId);
      } else {
        const followingUsers = user.followingUsers.filter(
          (ele) => ele !== action.followingId
        );
        user.followingUsers = followingUsers;
      }
      return state.map((us) => (us.id !== action.userId ? us : { ...user }));
    default:
      return state;
  }
};
export default usersReducer;
