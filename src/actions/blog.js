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

export { addBlog, editBlog, deleteBlog };
