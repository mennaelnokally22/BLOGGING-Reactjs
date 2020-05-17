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
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useStyles, theme } from './NavbarStyle';
import { ThemeProvider } from '@material-ui/core/styles';

import { setSearchText } from '../../actions/search';
import { setActiveFilter } from '../../actions/search';

const Navbar = ({ history, setSearchText, setActiveFilter, auth }) => {
  const classes = useStyles();
  const [searchText, setSearchTxt] = useState('');

  const handleChange = (e) => {
    setSearchTxt(e.currentTarget.value);
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
    <ThemeProvider theme={theme}>
      <div className={classes.grow}>
        <AppBar position='static' className={classes.dark}>
          <Toolbar>
            <Link to={'/home'} className={classes.resetLink}>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='open drawer'
              >
                <DonutSmallIcon
                  fontSize='large'
                  className={classes.iconColor}
                />
              </IconButton>
            </Link>
            <Typography className={classes.title} variant='h6'>
              Wiki-Blog
            </Typography>
            {auth.token && (
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
            )}
            {auth.token && (
              <Tabs
                value={value}
                onChange={handleFiltersClick}
                variant='fullWidth'
                indicatorColor='primary'
                className={classes.txtColor}
                aria-label='icon label tabs example'
              >
                <Tooltip title='Choose filter to be user'>
                  <Tab
                    icon={<AccountCircle className={classes.iconColor} />}
                    label='Users'
                    id={1}
                  />
                </Tooltip>
                <Tooltip title='Choose filter to be title of blog'>
                  <Tab
                    icon={<DescriptionIcon className={classes.iconColor} />}
                    label='Blogs Title'
                    id={2}
                  />
                </Tooltip>
                <Tooltip title='Choose filter to be tags'>
                  <Tab
                    icon={<CodeIcon className={classes.iconColor} />}
                    label='Blogs Tags'
                    id={3}
                  />
                </Tooltip>
              </Tabs>
            )}
            <div className={classes.grow} />
            <div>
              <Link to={'/home'} className={classes.resetLink}>
                <IconButton
                  edge='end'
                  aria-label='home'
                  aria-haspopup='true'
                  color='inherit'
                >
                  <HomeIcon fontSize='large' className={classes.iconColor} />
                </IconButton>
              </Link>
              {auth.token && (
                <Link to={`/profile/${auth._id}`} className={classes.resetLink}>
                  <Tooltip title={`Your profile ${auth.firstName}`}>
                    <IconButton
                      aria-label='account of current user'
                      aria-haspopup='true'
                      color='inherit'
                    >
                      <AccountCircle
                        fontSize='large'
                        className={classes.iconColor}
                      />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
              {auth.token && (
                <Link to={'/followers-blogs'} className={classes.resetLink}>
                  <Tooltip title='What Followers Say!'>
                    <IconButton
                      aria-label='What followers say'
                      aria-haspopup='true'
                      color='inherit'
                    >
                      <RecordVoiceOverIcon
                        fontSize='large'
                        className={classes.iconColor}
                      />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
              <Link to={'/sign-in'} className={classes.resetLink}>
                <Tooltip title='Sign In'>
                  <IconButton
                    aria-label='Sign In'
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <ExitToAppIcon
                      fontSize='large'
                      className={classes.iconColor}
                    />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};

const mapSatateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (searchText) => dispatch(setSearchText(searchText)),
  setActiveFilter: (activeFilter) => dispatch(setActiveFilter(activeFilter)),
});
export default connect(mapSatateToProps, mapDispatchToProps)(Navbar);
