import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import axios from 'axios';

import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/Blog/Blog';
import { setBlogs } from '../actions/blog';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiPaginationItem: {
      page: {
        color: 'white',
      },
    },
  },
});

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
  main: {
    paddingBottom: '460px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  txt: {
    textAlign: 'center',
    color: 'darkgray',
    fontSize: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const FollowersBlogs = ({ auth, history, setBlogs }) => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const handleChange = async (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    (async () => {
      axios
        .get(
          `https://blogging-api-nodejs.herokuapp.com/user/followed/blogs/${page}`,
          {
            headers: { Authorization: `${auth.token}` },
          }
        )
        .then((response) => {
          setPagesCount(response.data.pageCount);
          setUserData(response.data.blogs);
          setBlogs(response.data.blogs);
          response.data.blogs.length !== 0
            ? setLoading(true)
            : setLoading(false);
        })
        .catch((err) => {
          if (err.response?.data?.message == 'Token expired!') {
            toast.error('Your session has expired go and sign in again!');
            localStorage.setItem('expired', '1');
            history.replace('/sign-in');
          }
        });
    })();
  }, [page]);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Navbar history={history} />
        {userData.length === 0 && isLoading && (
          <Container className={classes.root}>
            <CircularProgress color='secondary' />
          </Container>
        )}
        <Container className={classes.main}>
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
          {userData.length !== 0 && (
            <div className={classes.pagination}>
              <Pagination
                color='secondary'
                size='large'
                count={pagesCount}
                page={page}
                onChange={handleChange}
              />
            </div>
          )}
          {userData.length === 0 && isLoading === false && (
            <Typography varient='h3' className={classes.txt}>
              You have no followers yet! &#128580;
            </Typography>
          )}
        </Container>
      </Fragment>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersBlogs);
