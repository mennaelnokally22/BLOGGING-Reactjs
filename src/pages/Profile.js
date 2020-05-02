import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

import UserCard from '../components/UserCard/UserCard';
import Navbar from '../components/Navbar/Navbar';
import BlogCard from '../components/Blog/Blog';
import UserEdit from '../components/UserEditForm/UserEdit';

const Profile = ({ blogs, users, match }) => {
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
  }));

  const classes = useStyles();

  const getUserName = (author, users) => {
    const { firstName } = users.find((user) => user.id === author);
    return firstName;
  };
  const getUser = (users) => {
    return users.find((user) => user.id === +match.params.id);
  };
  let isOpen = false;
  const [open, setOpen] = useState(isOpen);
  const handleClose = () => {
    setOpen(false);
  };
  const user = getUser(users);
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Typography variant='h3' gutterBottom>
          Your Info
        </Typography>
        <Grid
          container
          justify='space-evenly'
          spacing={6}
          className={classes.mb}
        >
          <Grid item xs={12} md={3}>
            <UserCard title='First Name' description={user.firstName}>
              <PersonIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UserCard title='Last Name' description={user.lastName}>
              <PersonIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
        </Grid>
        <Grid
          container
          justify='space-evenly'
          spacing={6}
          className={classes.mb}
        >
          <Grid item xs={12} md={3}>
            <UserCard title='Email' description={user.email}>
              <EmailIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UserCard title='Password' description={user.password}>
              <LockIcon color='secondary' fontSize='large' />
            </UserCard>
          </Grid>
        </Grid>
        <Divider className={classes.mb} />
        {blogs.map((blog) => (
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
        <Fab
          color='secondary'
          className={classes.editBtn}
          onClick={() => setOpen(true)}
        >
          <EditIcon />
        </Fab>
        {open && (
          <UserEdit isOpen={true} onClose={handleClose} editingUser={user} />
        )}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  blogs: state.blogs.filter(
    (blog) => blog.authorId === +ownProps.match.params.id
  ),
  users: state.users,
});

export default connect(mapStateToProps)(Profile);
