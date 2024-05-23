import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import Authentication from './components/Authentication';
import Blog from './components/Blog';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h1>{user ? 'blogs' : 'log in to application'}</h1>
      <Notification notification={notification} />
      {user ? (
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))
      ) : (
        <Authentication
          setUser={setUser}
          setNotification={setNotification}
        />
      )}
    </div>
  );
};

export default App;
