import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/Blog/Blog';
import { setBlogs } from '../actions/blog';

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(4),
  },
  mt: {
    marginTop: theme.spacing(4),
  },
  editBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FollowersBlogs = ({ auth, history, setBlogs }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      console.log(auth.token);
      axios
        .get(`http://localhost:3000/user/followed/blogs`, {
          headers: { Authorization: `${auth.token}` },
        })
        .then((response) => {
          setUserData(response.data.blogs);
          setBlogs(response.data.blogs);
          console.log(response.data.blogs);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response?.data?.message == 'Token expired!') {
            console.log('here');
            toast.error('Your session has expired go and sign in again!');
            localStorage.setItem('expired', '1');
            history.replace('/sign-in');
          }
        });
    })();
  }, []);
  const classes = useStyles();
  return (
    <Fragment>
      <Navbar history={history} />
      {userData.length === 0 && (
        <Container className={classes.root}>
          <CircularProgress color='secondary' />
        </Container>
      )}
      {userData.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          body={blog.body}
          photo={blog.photo}
          author={blog.authorId.firstName}
          authorLast={blog.authorId.lastName}
          authorId={blog.authorId._id}
          createdAt={blog.createdAt}
          tags={blog.tags}
        />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersBlogs);
