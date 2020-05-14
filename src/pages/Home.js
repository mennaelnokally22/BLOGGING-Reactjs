import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import BlogCard from '../components/Blog/Blog';
import Navbar from '../components/Navbar/Navbar';
import BlogAdd from '../components/BlogAdd/BlogAdd';

import { fetchBlogs, fetchBlogsPages } from '../actions/blog';
import { Container } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiPaginationItem: {
      page: {
        color: 'white',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  col: {
    backgroundColor: theme.palette.info.main,
  },
}));

const Home = ({ blogs, auth, history, fetchBlogs, fetchBlogsPages }) => {
  useEffect(() => {
    (async () => {
      //await fetchBlogs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const data = await fetchBlogsPages(1);
      setPagesCount(data.pagesCount);
      console.log(data);
    })();
  }, []);

  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const handleChange = async (event, value) => {
    setPage(value);
    const data = await fetchBlogsPages(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Navbar history={history} />
        {auth.token && <BlogAdd />}

        {blogs.length === 0 && (
          <Container className={classes.root}>
            <CircularProgress color='secondary' />
          </Container>
        )}

        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            body={blog.body}
            photo={blog.photo}
            author={blog.authorId.firstName}
            authorLast={blog.authorId.lastName}
            authorId={blog.authorId._id}
            createdAt={blog.createdAt}
            tags={blog.tags}
          />
        ))}
        <div className={classes.pagination}>
          <Pagination
            color='secondary'
            size='large'
            count={pagesCount}
            page={page}
            onChange={handleChange}
          />
        </div>
      </Fragment>
    </ThemeProvider>
  );
};

const mapSatateToProps = (state) => ({
  blogs: state.blogs,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  fetchBlogs: () => dispatch(fetchBlogs()),
  fetchBlogsPages: (pageNum) => dispatch(fetchBlogsPages(pageNum)),
});
export default connect(mapSatateToProps, mapDispatchToProps)(Home);
