import { useState } from 'react';

import blogService from '../services/blogs';

const CreateNewBlogForm = ({ setBlogs, setNotificationMessage }) => {
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

    try {
      const response = await blogService.create(newBlog);
      setBlogs((prevBlogs) => [...prevBlogs, response]);
      setState({ title: '', author: '', url: '' });
      setNotificationMessage(
        'success',
        `a new blog ${response.title} by ${response.author} added`
      );
    } catch (error) {
      setNotificationMessage('error', error.response.data.error);
    }
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
