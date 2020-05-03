import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import BlogCard from '../components/Blog/Blog';

const getUserName = (author, users) => {
  const { firstName } = users.find((user) => user.id === author);
  return firstName;
};

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
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: '400px',
    transition: 'transform 0.2s ease-in-out',
    margin: '0 auto',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  mb: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    margin: '0 auto',
  },
  link: {
    color: 'black',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const SearchResult = ({ searchData, blogs, users }) => {
  let filteredBlogs = [];
  let filteredUsers = [];
  if (searchData.activeFilter === 2) {
    filteredBlogs = blogs.filter((blog) =>
      blog.title
        .toLocaleLowerCase()
        .includes(searchData.searchText.toLocaleLowerCase())
    );
  } else if (searchData.activeFilter === 3) {
    filteredBlogs = blogs.filter((blog) =>
      blog.tags.includes(searchData.searchText.trim())
    );
  } else if (searchData.activeFilter === 1) {
    filteredUsers = users.filter(
      (user) =>
        user.firstName
          .toLocaleLowerCase()
          .includes(searchData.searchText.trim().toLocaleLowerCase()) ||
        user.lastName
          .toLocaleLowerCase()
          .includes(searchData.searchText.trim().toLocaleLowerCase())
    );
  }
  const classes = useStyles();
  return (
    <Fragment>
      <Typography variant='h4' className={classes.mb}>
        Your search results
      </Typography>
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          body={blog.body}
          author={getUserName(blog.authorId, users)}
          createdAt={blog.createdAt}
          tags={blog.tags}
        />
      ))}
      {filteredUsers.map((user) => (
        <Paper key={user.id} className={classes.card}>
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
              <Link to={`/profile/${user.id}`} className={classes.link}>
                <Typography variant='h4'>{`${user.firstName} ${user.lastName}`}</Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  searchData: state.search,
  blogs: state.blogs,
  users: state.users,
});
export default connect(mapStateToProps)(SearchResult);
