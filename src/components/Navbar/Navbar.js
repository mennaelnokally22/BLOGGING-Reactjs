import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import useStyles from './NavbarStyle';

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <DonutSmallIcon fontSize='large' color='secondary' />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            MERN-Blogging
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={'/home'} className={classes.resetLink}>
              <IconButton
                edge='end'
                aria-label='home'
                aria-haspopup='true'
                color='inherit'
              >
                <Typography variant='h6'>Home</Typography>
                <HomeIcon fontSize='large' color='secondary' />
              </IconButton>
            </Link>
            <Link to={'/profile/:id'} className={classes.resetLink}>
              <IconButton
                aria-label='account of current user'
                aria-haspopup='true'
                color='inherit'
              >
                <Typography variant='h6'>Anonymous</Typography>
                <AccountCircle fontSize='large' color='secondary' />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
