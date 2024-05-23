import { useState, useEffect, useCallback } from 'react';

import blogService from './services/blogs';
import Authentication from './components/Authentication';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import CreateNewBlogForm from './components/CreateNewBlogForm';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [notification, setNotification] = useState(null);

  const setNotificationMessage = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
    setIsLoading(false);
  }, []);

  const checkUser = useCallback(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    checkUser();
  }, [fetchBlogs, checkUser]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notification notification={notification} />

      <Authentication
        user={user}
        setUser={setUser}
        setNotificationMessage={setNotificationMessage}
      />
      {user && (
        <>
          <CreateNewBlogForm
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
          />
          <hr />
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
