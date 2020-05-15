import axios from 'axios';

const setAuth = (userData) => ({
  type: 'SET_AUTH',
  userData,
});

const signUp = (user) => {
  return async (dispatch) => {
    const data = await axios.post('http://localhost:3000/user/register', user);
    return data;
  };
};

const signIn = (userData) => {
  return async (dispatch) => {
    const data = await axios.post('http://localhost:3000/user/login', userData);
    delete data.data.user.password;
    delete data.data.user.__v;
    dispatch(setAuth({ token: data.data.token, ...data.data.user }));
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    localStorage.setItem('expired', '0');
    return data;
  };
};

const toggleFollowing = (followingId) => ({
  type: 'FOLLOW_USER',
  followingId,
});

const onToggleFollowing = (followingId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `http://localhost:3000/user/${followingId}/follow`,
      null,
      {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      }
    );
    console.log(data);
    delete data.user.password;
    delete data.user.__v;
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(toggleFollowing(followingId));
  };
};

export { signIn, setAuth, toggleFollowing, onToggleFollowing, signUp };
