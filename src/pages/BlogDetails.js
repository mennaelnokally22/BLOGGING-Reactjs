import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Avatar, Box } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import Navbar from '../components/Navbar/Navbar';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: 'white',
  },
  avatar: {
    backgroundColor: theme.palette.info.main,
  },
  user: {
    color: 'white',
    fontSize: '28px',
    fontWeight: '500',
  },
  timeContainer: {
    display: 'flex',
    marginTop: '10px',
    marginLeft: '55px',
  },
  iconColor: {
    color: theme.palette.info.main,
  },
  content: {
    padding: theme.spacing(2),
    fontSize: '27px',
    fontWeight: '500',
    color: 'white',
  },
  tags: {
    border: `2px solid ${theme.palette.info.main}`,
    borderRadius: '22px',
    color: theme.palette.info.main,
    paddingLeft: '15px',
    paddingRight: '15px',
    textAlign: 'center',
  },
  mt: {
    marginTop: theme.spacing(2),
  },
  img: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(5),
    height: '40vw',
  },
}));

const BlogDetails = ({ blog, auth, history }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Navbar history={history} />
      <Container>
        <Typography
          component='h1'
          variant='h1'
          gutterBottom
          className={classes.heading}
        >
          {blog?.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              title={blog?.authorId?.firstName}
              variant='rounded'
              className={classes.avatar}
            >
              {`${blog?.authorId?.firstName.charAt(
                0
              )}${blog?.authorId?.lastName.charAt(0)}`}
            </Avatar>
          </Grid>
          <Grid item className={classes.user}>
            {`${blog?.authorId?.firstName} ${blog?.authorId?.lastName}`}
          </Grid>
        </Grid>
        <div className={classes.timeContainer}>
          <EventAvailableIcon
            style={{ marginRight: '3px' }}
            className={classes.iconColor}
          />
          <time
            dateTime={moment(blog?.createdAt).format()}
            className={classes.heading}
          >
            {moment(blog?.createdAt).format('D MMMM YYYY')}
          </time>
        </div>
      </Container>
      {blog.photo != 'null' && blog.photo != undefined && (
        <Box
          className={classes.img}
          style={{
            backgroundImage: `url("${blog.photo}")`,
          }}
        ></Box>
      )}
      <Container>
        <Typography paragraph varient='subtitle2' className={classes.content}>
          {blog?.body}
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='flex-start'
          spacing={2}
          className={classes.mt}
        >
          {blog?.tags.map((tag) => (
            <Grid item key={tag}>
              <Typography className={classes.tags} variant='subtitle1'>
                {tag}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};
const mapSatateToProps = (state, ownProps) => ({
  blog: state.blogs.find((blog) => blog._id === ownProps.match.params.id),
  auth: state.auth,
});

export default connect(mapSatateToProps)(BlogDetails);
