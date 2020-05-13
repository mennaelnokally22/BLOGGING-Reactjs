import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import { useStyles, theme } from './BlogAddStyle';
import { ThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

import { onAddBlog } from '../../actions/blog';

const BlogSchema = object().shape({
  title: string().required('Blog title is required!'),
  body: string()
    .min(20, 'Body needs to be at least 20 characters!')
    .required('Body is required!'),
});

const BlogAdd = ({ onAddBlog }) => {
  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm({
    validationSchema: BlogSchema,
    mode: 'onBlur',
  });

  const onSubmit = (data, e) => {
    console.log(data);
    console.log(e);
    onAddBlog({
      ...data,
      tags: data.tags.split(' '),
    });
    e.target.title.value = '';
    e.target.body.value = '';
    e.target.tags.value = '';
    toast.success(`Blog ${data.title} added successfully!`);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ButtonBase component='a' className={classes.cardContainer}>
          <Paper className={classes.card} elevation={2}>
            <Typography variant='h4' className={classes.txtColor}>
              Add your new blog
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                id='title'
                name='title'
                label='Blog Title'
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
                error={!!errors.title}
                helperText={errors.title?.message}
                inputRef={register}
              />
              <TextField
                id='body'
                name='body'
                label='Blog Body'
                variant='outlined'
                multiline
                rows='4'
                fullWidth
                margin='normal'
                error={!!errors.body}
                helperText={errors.body?.message}
                inputRef={register}
              />
              <TextField
                id='tags'
                name='tags'
                label='Blog Tags'
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
                inputRef={register}
              />
              <DropzoneArea
                acceptedFiles={['image/*']}
                filesLimit={1}
                dropzoneText={`Drag & Drop image here or click`}
                maxFileSize={(1000 * 1000) / 2}
                showPreviewsInDropzone={false}
                dropzoneClass={classes.dropZone}
              />
              <Button
                type='submit'
                variant='contained'
                className={classes.submitBtn}
              >
                Add
              </Button>
            </form>
          </Paper>
        </ButtonBase>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAddBlog: (blog) => dispatch(onAddBlog(blog)),
});

export default connect(null, mapDispatchToProps)(BlogAdd);
