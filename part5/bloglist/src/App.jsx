import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import Authentication from './components/Authentication';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Blogs from './components/Blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notification notification={notification} />

      {user ? (
        <Blogs
          user={user}
          blogs={blogs}
        />
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
