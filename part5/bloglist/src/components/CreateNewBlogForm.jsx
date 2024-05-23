import { useState } from 'react';

import blogService from '../services/blogs';

const CreateNewBlogForm = ({ setBlogs }) => {
  const [state, setState] = useState({ title: '', author: '', url: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: state.title,
      author: state.author,
      url: state.url,
    };

    await blogService.create(newBlog);
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    setState({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateForm}>
        <div>
          title:
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={state.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={state.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNewBlogForm;
