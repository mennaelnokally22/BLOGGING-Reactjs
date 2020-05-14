import axios from 'axios';

const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  blogs,
});

const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  blog,
});

const editBlog = (blogId, updates) => ({
  type: 'EDIT_BLOG',
  blogId,
  updates,
});

const deleteBlog = (blogId) => ({
  type: 'DELETE_BLOG',
  blogId,
});

const fetchBlogs = () => {
  return async (dispatch) => {
    const { data: blogs } = await axios.get('http://localhost:3000/blog');
    dispatch(setBlogs(blogs));
  };
};

const fetchBlogsPages = (pageNum) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:3000/blog/pages/${pageNum}`
    );
    dispatch(setBlogs(data.blogs));
    return data;
  };
};

const onAddBlog = (blog) => {
  return async (dispatch) => {
    console.log(blog);
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('body', blog.body);
    formData.append('tags', JSON.stringify(blog.tags));
    formData.append('photo', blog.photo);
    const { data } = await axios.post('http://localhost:3000/blog', formData, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    });
    dispatch(addBlog(data.blog));
  };
};

const onEditBlog = (blogId, updates) => {
  return async (dispatch) => {
    const { data } = await axios.patch(
      `http://localhost:3000/blog/${blogId}`,
      updates,
      {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      }
    );
    console.log(data);
    dispatch(editBlog(blogId, updates));
  };
};

const onDeleteBlog = (blogId) => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `http://localhost:3000/blog/${blogId}`,
      {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      }
    );
    console.log(data);
    dispatch(deleteBlog(blogId));
  };
};

export {
  setBlogs,
  addBlog,
  editBlog,
  deleteBlog,
  fetchBlogs,
  fetchBlogsPages,
  onAddBlog,
  onEditBlog,
  onDeleteBlog,
};
