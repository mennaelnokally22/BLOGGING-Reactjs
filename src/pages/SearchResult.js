import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import axios from 'axios';
import { setBlogs } from '../actions/blog';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import BlogCard from '../components/Blog/Blog';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'block',
    transition: 'transform 0.2s ease-in-out',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    width: '75%',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  card: {
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: 'transparent',
    width: '400px',
    transition: 'transform 0.2s ease-in-out',
    margin: '0 auto',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  mb: {
    padding: theme.spacing(4),
    margin: '0 auto',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  link: {
    color: 'white',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkIcon: {
    color: 'white',
    textDecoration: 'none',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  main: {
    paddingBottom: '410px',
  },
  txt: {
    textAlign: 'center',
    color: 'darkgray',
    fontSize: '40px',
  },
  btn: {
    position: 'fixed',
    bottom: '0',
  },
}));

const SearchResult = ({ searchData, auth, history, setBlogs }) => {
  const [filteredBlogss, setFilteredBlogs] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(auth.token);
    (async () => {
      if (searchData.activeFilter === 2) {
        axios
          .get(
            `https://blogging-api-nodejs.herokuapp.com/blog/search?title=${searchData.searchText}`,
            { headers: { Authorization: auth.token } }
          )
          .then((response) => {
            setFilteredBlogs(response.data);
            response.data.length !== 0 ? setLoading(true) : setLoading(false);
            setBlogs(response.data);
          })
          .catch((err) => {
            if (err.response.data.message == 'Token expired!') {
              toast.error('Your session has expired go and sign in again!');
              localStorage.setItem('expired', '1');
              history.replace('/sign-in');
            }
          });
      } else if (searchData.activeFilter === 3) {
        axios
          .get(
            `https://blogging-api-nodejs.herokuapp.com/blog/search?tag=${searchData.searchText}`,
            {
              headers: { Authorization: auth.token },
            }
          )
          .then((response) => {
            setFilteredBlogs(response.data);
            response.data.length !== 0 ? setLoading(true) : setLoading(false);
            setBlogs(response.data);
          })
          .catch((err) => {
            if (err.response.data.message == 'Token expired!') {
              toast.error('Your session has expired go and sign in again!');
              localStorage.setItem('expired', '1');
              history.replace('/sign-in');
            }
          });
      } else if (searchData.activeFilter === 1) {
        axios
          .get(
            `https://blogging-api-nodejs.herokuapp.com/user/search?name=${searchData.searchText}`,
            {
              headers: { Authorization: auth.token },
            }
          )
          .then((response) => {
            setFilteredUsers(response.data.users);
            response.data.users.length !== 0
              ? setLoading(true)
              : setLoading(false);
          })
          .catch((err) => {
            if (err.response.data.message == 'Token expired!') {
              toast.error('Your session has expired go and sign in again!');
              localStorage.setItem('expired', '1');
              history.replace('/sign-in');
            }
          });
      }
    })();
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <Typography variant='h4' className={classes.mb}>
        Your search results &#129488;
      </Typography>
      {filteredBlogss.length === 0 && filteredUsers.length === 0 && isLoading && (
        <Container className={classes.root}>
          <CircularProgress color='secondary' />
        </Container>
      )}
      {filteredBlogss.length > 0 && (
        <Container>
          {filteredBlogss.map((blog) => (
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
        </Container>
      )}

      {filteredUsers.length > 0 && (
        <Container>
          {filteredUsers.map((user) => (
            <Paper key={user._id} className={classes.card}>
              <Grid container alignItems='center' spacing={2}>
                <Grid item>
                  <Avatar
                    title={user.firstName}
                    variant='rounded'
                    className={classes.avatar}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Link to={`/profile/${user._id}`} className={classes.link}>
                    <Typography variant='h4'>{`${user.firstName} ${user.lastName}`}</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Container>
      )}
      {filteredUsers.length === 0 &&
        filteredBlogss.length === 0 &&
        isLoading === false && (
          <Typography variant='h4' className={classes.txt}>
            No results matched! &#128560;
          </Typography>
        )}
      <Fab color='secondary' className={classes.btn}>
        <Link to={'/home'} className={classes.linkIcon}>
          <ArrowBackIcon />
        </Link>
      </Fab>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  searchData: state.search,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
