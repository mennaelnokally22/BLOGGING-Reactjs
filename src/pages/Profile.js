import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Badge } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

import axios from 'axios';
import { setBlogs } from '../actions/blog';
import { onToggleFollowing } from '../actions/auth';

import UserCard from '../components/UserCard/UserCard';
import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/Blog/Blog';
import UserEdit from '../components/UserEditForm/UserEdit';

const Profile = ({
  match,
  auth,
  history,
  blogs,
  setBlogs,
  onToggleFollowing,
}) => {
  const [userData, setUserData] = useState({
    blogs: [],
    user: { firstName: '', lastName: '' },
  });
  const [isLoading, setLoading] = useState(true);

  const [switchState, setSwitchState] = useState(
    auth?.followingUsers?.includes(match.params.id) ? true : false
  );

  const handleChange = (event) => {
    console.log(event.target.name, event.target.checked);
    setSwitchState(event.target.checked);
    onToggleFollowing(match.params.id, auth._id);
    if (event.target.checked) {
      toast.success('You are now following this user');
    } else {
      toast.warn('You are now unfollowed this user !');
    }
  };

  useEffect(() => {
    (async () => {
      console.log(auth.token);
      axios
        .get(`http://localhost:3000/user/${match.params.id}`, {
          headers: { Authorization: `${auth.token}` },
        })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
          setBlogs(response.data.blogs);
          response.data.blogs.length !== 0
            ? setLoading(true)
            : setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.message == 'Token expired!') {
            console.log('here');
            toast.error('Your session has expired go and sign in again!');
            localStorage.setItem('expired', '1');
            history.replace('/sign-in');
          }
        });
    })();
  }, []);
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
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(4),
    },
    mr: {
      margin: theme.spacing(4),
    },
    txtColor: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    txt: {
      textAlign: 'center',
      color: 'darkgray',
      fontSize: '40px',
    },
  }));

  const classes = useStyles();

  return (
    <Fragment>
      <Navbar history={history} />
      <Container>
        <Typography variant='h3' gutterBottom className={classes.txtColor}>
          User Info
        </Typography>
        <Grid
          container
          justify='space-evenly'
          spacing={6}
          className={classes.mb}
        >
          <Grid item xs={12} md={3}>
            <UserCard title='First Name' description={userData.user.firstName}>
              <PersonIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UserCard title='Last Name' description={userData.user.lastName}>
              <PersonIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
          {auth.token && auth._id !== match.params.id && (
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={switchState}
                    onChange={handleChange}
                    name='followCheck'
                  />
                }
              />
              {switchState ? (
                <Badge
                  className={classes.mr}
                  badgeContent={'Following'}
                  color='primary'
                ></Badge>
              ) : (
                <Badge
                  className={classes.mr}
                  color='primary'
                  badgeContent={'Follow'}
                ></Badge>
              )}
            </Grid>
          )}
        </Grid>
        <Divider className={classes.mb} />
        {userData.blogs.length === 0 && isLoading && (
          <Container className={classes.root}>
            <CircularProgress color='secondary' />
          </Container>
        )}
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            body={blog.body}
            photo={blog.photo}
            author={userData.user.firstName}
            authorLast={userData.user.lastName}
            authorId={blog.authorId}
            createdAt={blog.createdAt}
            tags={blog.tags}
          />
        ))}
        {userData.blogs.length === 0 && isLoading === false && (
          <Typography varient='h3' className={classes.txt}>
            You have no blogs yet!
          </Typography>
        )}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  blogs: state.blogs,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
  onToggleFollowing: (followingId, userId) =>
    dispatch(onToggleFollowing(followingId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
