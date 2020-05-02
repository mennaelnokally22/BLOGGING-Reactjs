import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import useStyles from './UserEditStyle';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUser } from '../../actions/user';

const UserSchema = object().shape({
  firstName: string()
    .min(3, 'First name needs to be at least 3 chars')
    .required('First name is required!'),
  lastName: string()
    .min(3, 'First name needs to be at least 3 chars')
    .required('Last name is required!'),
  email: string().email().required('Email is required'),
  password: string()
    .min(6, 'Password needs to be at least 6 chars')
    .required('Password is required'),
});

const UserEdit = ({ isOpen, editingUser, onClose, updateUser }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  const { handleSubmit, register, errors } = useForm({
    validationSchema: UserSchema,
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    console.log(data);
    updateUser(editingUser.id, { ...data });
    toast.success(`Your data updated successfully!`);
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
              id='firstName'
              name='firstName'
              label='First Name'
              type='text'
              defaultValue={editingUser.firstName}
              fullWidth
              margin='normal'
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              inputRef={register}
            />
            <TextField
              id='lastName'
              name='lastName'
              label='Last Name'
              type='text'
              defaultValue={editingUser.lastName}
              fullWidth
              margin='normal'
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              inputRef={register}
            />
            <TextField
              id='email'
              name='email'
              label='Email'
              type='text'
              defaultValue={editingUser.email}
              fullWidth
              margin='normal'
              error={!!errors.email}
              helperText={errors.email?.message}
              inputRef={register}
            />
            <TextField
              id='password'
              name='password'
              label='Password'
              type='text'
              defaultValue={editingUser.password}
              fullWidth
              margin='normal'
              error={!!errors.password}
              helperText={errors.password?.message}
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
  updateUser: (id, updates) => dispatch(updateUser(id, updates)),
});

export default connect(null, mapDispatchToProps)(UserEdit);
