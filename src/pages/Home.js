import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlogCard from '../components/Blog/Blog';
import Navbar from '../components/Navbar/Navbar';

const getUserName = (author, users) => {
  const { firstName } = users.find((user) => user.id === author);
  return firstName;
};
const Home = ({ blogs, users, history }) => {
  return (
    <Fragment>
      <Navbar history={history} />
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          body={blog.body}
          author={getUserName(blog.authorId, users)}
          createdAt={blog.createdAt}
          tags={blog.tags}
        />
      ))}
    </Fragment>
  );
};

const mapSatateToProps = (state) => ({
  blogs: state.blogs,
  users: state.users,
});
export default connect(mapSatateToProps)(Home);
