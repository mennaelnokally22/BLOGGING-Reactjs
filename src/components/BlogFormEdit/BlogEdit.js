import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import useStyles from './BlogEditStyle';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { editBlog } from '../../actions/blog';

const BlogSchema = object().shape({
  title: string().required('Blog title is required!'),
  body: string()
    .min(20, 'Body needs to be at least 20 characters!')
    .required('Body is required!'),
});

const BlogEdit = ({ isOpen, editingBlog, onClose, editBlog }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);

  const { handleSubmit, register, errors } = useForm({
    validationSchema: BlogSchema,
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    editBlog(editingBlog.id, { ...data });
    toast.success(`Blog ${data.title} Updated successfully!`);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  return (
    <Box m={4} p={4} className={classes.w}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Blog</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              id='title'
              name='title'
              label='Blog Title'
              type='text'
              defaultValue={editingBlog.title}
              fullWidth
              margin='normal'
              error={!!errors.title}
              helperText={errors.title?.message}
              inputRef={register}
            />
            <TextField
              id='body'
              name='body'
              label='Blog Body'
              defaultValue={editingBlog.body}
              multiline
              rows='4'
              fullWidth
              margin='normal'
              error={!!errors.body}
              helperText={errors.body?.message}
              inputRef={register}
            />
            <Button
              type='submit'
              color='secondary'
              className={classes.submitBtn}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editBlog: (blogId, updates) => dispatch(editBlog(blogId, updates)),
});

export default connect(null, mapDispatchToProps)(BlogEdit);
