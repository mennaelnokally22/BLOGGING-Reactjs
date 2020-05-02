const blogReducerDefaultState = [
  {
    id: 1,
    title: 'MEAN STACK Article',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Non minor, inquit, voluptas percipitur ex vilissimis rebus quam ex pretiosissimis. Ego vero volo in virtute vim esse quam maximam; Illis videtur, qui illud non dubitant bonum dicere -;
    Explanetur igitur. Quid de Platone aut de Democrito loquar? Non igitur bene. Addidisti ad extremum etiam indoctum fuisse. Duo Reges: constructio interrete. Quod dicit Epicurus etiam de voluptate, quae minime sint voluptates, eas obscurari saepe et obrui. Quae fere omnia appellantur uno ingenii nomine, easque virtutes qui habent, ingeniosi vocantur. Graccho, eius fere, aequalí? Quid est, quod ab ea absolvi et perfici debeat? Quos quidem tibi studiose et diligenter tractandos magnopere censeo.`,
    photo: 'img.png',
    tags: ['#hello', '#developer'],
    authorId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'MERN STACK Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#helloworld', '#developer'],
    authorId: 2,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'FULL STACK Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#hello', '#developer'],
    authorId: 3,
    createdAt: new Date(),
  },
  {
    id: 4,
    title: 'Frontend Article',
    body: 'hhajahdjd,sdsfhhf,fjfggfgf',
    photo: 'img.png',
    tags: ['#helloFrontEnd', '#developer'],
    authorId: 1,
    createdAt: new Date(),
  },
];

const blogsReducer = (state = blogReducerDefaultState, action) => {
  switch (action.type) {
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
