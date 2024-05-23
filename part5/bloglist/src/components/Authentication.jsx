import { useState } from 'react';

import authService from '../services/authentication';
import blogService from '../services/blogs';

const Authentication = ({ user, setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({ username, password });

      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotificationMessage('error', error.response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser');
    blogService.setToken(null);
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Authentication;
