import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import useStyles from './NavbarStyle';

import { setSearchText } from '../../actions/search';
import { setActiveFilter } from '../../actions/search';

const Navbar = ({ history, setSearchText, setActiveFilter }) => {
  const classes = useStyles();
  const [searchText, setSearchTxt] = useState('');

  const handleChange = (e) => {
    setSearchTxt(e.currentTarget.value);
    console.log(searchText);
    setSearchText(e.currentTarget.value);
  };
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      history.replace('/results');
    }
  };
  const [value, setValue] = React.useState(0);
  const handleFiltersClick = (e, newValue) => {
    setValue(newValue);
    setActiveFilter(+e.currentTarget.id);
  };
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
            <Tooltip title='Type then press enter'>
              <InputBase
                placeholder='Search…'
                name='searchText'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchText}
                onChange={handleChange}
                onKeyPress={handleKeyEnter}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Tooltip>
          </div>
          <Tabs
            value={value}
            onChange={handleFiltersClick}
            variant='fullWidth'
            indicatorColor='secondary'
            className={classes.txtColor}
            aria-label='icon label tabs example'
          >
            <Tooltip title='Choose filter to be user'>
              <Tab
                icon={<AccountCircle color='secondary' />}
                label='Users'
                id={1}
              />
            </Tooltip>
            <Tooltip title='Choose filter to be title of blog'>
              <Tab
                icon={<DescriptionIcon color='secondary' />}
                label='Blogs Title'
                id={2}
              />
            </Tooltip>
            <Tooltip title='Choose filter to be tags'>
              <Tab
                icon={<CodeIcon color='secondary' />}
                label='Blogs Tags'
                id={3}
              />
            </Tooltip>
          </Tabs>
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
};

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (searchText) => dispatch(setSearchText(searchText)),
  setActiveFilter: (activeFilter) => dispatch(setActiveFilter(activeFilter)),
});
export default connect(null, mapDispatchToProps)(Navbar);
