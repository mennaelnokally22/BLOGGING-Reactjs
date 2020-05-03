import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import moment from 'moment';
import useStyles from './BlogStyle';
import BlogEdit from '../BlogFormEdit/BlogEdit';

import { deleteBlog } from '../../actions/blog';

const BlogCard = ({
  id,
  title,
  body,
  photo,
  tags,
  author,
  createdAt,
  deleteBlog,
}) => {
  const classes = useStyles();
  let isOpen = false;
  const [open, setOpen] = useState(isOpen);
  const handleClick = (id) => {
    console.log(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ButtonBase component='a' className={classes.cardContainer}>
        <Paper className={classes.card} elevation={2}>
          <Grid
            container
            alignItems='center'
            spacing={2}
            className={classes.mb}
          >
            <Grid item>
              <Avatar
                title={author}
                variant='rounded'
                className={classes.avatar}
              >
                {author.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Link to={`/profile/${id}`} className={classes.link}>
                <Typography variant='h4'>{author}</Typography>
              </Link>
            </Grid>
          </Grid>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='subtitle1' className={classes.mt}>
            {body}
          </Typography>
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
              <EventAvailableIcon style={{ marginRight: '3px' }} />
              <time dateTime={moment(createdAt).format()}>
                {moment(createdAt).format('D MMMM YYYY')}
              </time>
            </div>
            <Grid item>
              <Button
                onClick={() => {
                  deleteBlog(id);
                  toast.success(`Blog ${title} deleted successfully!`);
                }}
              >
                <DeleteIcon color='secondary' />
              </Button>
              <Button
                onClick={() => {
                  handleClick(id);
                  setOpen(true);
                }}
              >
                <BorderColorIcon color='secondary' />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
      {open && (
        <BlogEdit
          editingBlog={{ id, title, body }}
          isOpen={true}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
});

export default connect(null, mapDispatchToProps)(BlogCard);
