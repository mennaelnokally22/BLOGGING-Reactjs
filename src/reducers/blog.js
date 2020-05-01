const blogReducerDefaultState = [
  {
    id: 1,
    title: 'MEAN STACK Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#hello', '#developer'],
    authorId: 1,
  },
  {
    id: 2,
    title: 'MERN STACK Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#helloworld', '#developer'],
    authorId: 2,
  },
  {
    id: 3,
    title: 'FULL STACK Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#hello', '#developer'],
    authorId: 3,
  },
  {
    id: 4,
    title: 'Frontend Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#helloFrontEnd', '#developer'],
    authorId: 1,
  },
];

const blogsReducer = (state = blogReducerDefaultState, action) => {
  switch (action.key) {
    case 'ADD_BLOG':
      return state.concat(action.blog);
    case 'EDIT_BLOG':
      return state.map((blog) =>
        blog.id !== action.blogId ? blog : { ...blog, ...action.updates }
      );
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.blogId);
    default:
      return state;
  }
};

export default blogsReducer;
