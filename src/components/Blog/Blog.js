import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import moment from 'moment';
import useStyles from './BlogStyle';
import BlogEdit from '../BlogFormEdit/BlogEdit';

import { onDeleteBlog } from '../../actions/blog';
import { onToggleFollowing } from '../../actions/auth';
import { Box } from '@material-ui/core';

const BlogCard = ({
  id,
  title,
  body,
  photo,
  tags,
  author,
  authorLast,
  authorId,
  createdAt,
  onDeleteBlog,
  onToggleFollowing,
  auth,
}) => {
  const classes = useStyles();
  let isOpen = false;
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  {
    console.log('authorID Profile', authorId);
    console.log('auth', auth._id);
  }
  return (
    <Container>
      <Paper
        className={`${classes.card} ${classes.cardContainer}`}
        elevation={2}
      >
        <Grid container alignItems='center' spacing={2} className={classes.mb}>
          {author != undefined && (
            <Grid item>
              <Avatar
                title={author}
                variant='rounded'
                className={classes.avatar}
              >
                {`${author.charAt(0)}${authorLast.charAt(0)}`}
              </Avatar>
            </Grid>
          )}
          {auth.token === null && (
            <Grid item component={'h4'} className={classes.authorName}>
              {`${author} ${authorLast}`}
            </Grid>
          )}
          {auth.token && (
            <Grid
              item
              component={Link}
              to={`/profile/${authorId}`}
              className={classes.link}
            >
              {`${author} ${authorLast}`}
            </Grid>
          )}

          {auth.token &&
            auth._id !== authorId &&
            auth.followingUsers.includes(authorId) && (
              <Grid item>
                <Badge color='secondary' badgeContent={'F'}>
                  <CheckCircleIcon className={classes.iconColor} />
                </Badge>
              </Grid>
            )}
        </Grid>

        <Typography variant='h4' className={classes.txtColor}>
          <Link to={`/blog/${id}`} className={classes.link}>
            {title}
          </Link>
        </Typography>

        <Typography
          variant='subtitle1'
          className={`${classes.mt} ${classes.txtColor}`}
        >
          {`${body.substr(0, 250)} ${body.length > 250 ? '....' : ''}`}
        </Typography>

        {photo != 'null' && photo != undefined && (
          <Grid container alignItems='center' justify='flex-start'>
            <Grid item sm={6}>
              <Box
                className={classes.img}
                component='img'
                display='block'
                boxShadow={2}
                src={`http://localhost:3000/${photo}`}
              />
            </Grid>
          </Grid>
        )}
        <Grid
          container
          alignItems='center'
          justify='flex-start'
          spacing={2}
          className={classes.mt}
        >
          {tags.map((tag) => (
            <Grid item key={tag}>
              <Typography className={classes.tags} variant='subtitle1'>
                {tag}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          justify='space-between'
          alignItems='center'
          className={classes.createdAt}
        >
          <div className={classes.timeContainer}>
            <EventAvailableIcon
              style={{ marginRight: '3px' }}
              className={classes.iconColor}
            />
            <time
              dateTime={moment(createdAt).format()}
              className={classes.txtColor}
            >
              {moment(createdAt).format('D MMMM YYYY')}
            </time>
          </div>
          {auth.token && auth._id === authorId && (
            <Grid item>
              <Button
                onClick={() => {
                  onDeleteBlog(id);
                  toast.success(`Blog ${title} deleted successfully!`);
                }}
              >
                <DeleteIcon className={classes.iconColor} />
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                <BorderColorIcon className={classes.iconColor} />
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      {open && (
        <BlogEdit
          editingBlog={{ id, title, body, tags }}
          isOpen={true}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

const mapSatateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteBlog: (blogId) => dispatch(onDeleteBlog(blogId)),
  onToggleFollowing: (followingId, userId) =>
    dispatch(onToggleFollowing(followingId, userId)),
});

export default connect(mapSatateToProps, mapDispatchToProps)(BlogCard);
