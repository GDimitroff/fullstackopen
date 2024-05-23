# Blog List API

This is a REST API for a blog list application. It allows users to register, login, and store details about interesting blogs they've discovered online. Each blog entry records the author's name, the title of the blog, its URL, and the number of likes it has received.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Create a `.env` file in the root directory of your project and add the following environment variables
$ MONGODB_URI=<YOUR_MONGODB_URI>
$ TEST_MONGODB_URI=<YOUR_TEST_MONGODB_URI>
$ SECRET=<YOUR_SECRET>
$ PORT=3001

# You can run the tests if you want
$ npm test

# Start the server
$ npm run dev
```

## API Endpoints

Once successfully connected, the API allows you to perform the following operations:

- Register and retrieve `Users` (POST, GET)
- Login using username and password (POST)
- Create, retrieve, update, and delete `Blogs` (POST, GET, PUT, DELETE) for an authenticated user

Those operations are possible using the following endpoints:

- http://localhost:3001/api/login
- http://localhost:3001/api/users
- http://localhost:3001/api/blogs

## Examples

Create a new user  
POST `/api/users`

```json
{
  "username": "average joe",
  "name": "joe",
  "password": "weak-password"
}
```

Login with the created user  
POST `/api/login`

```json
{
  "username": "average joe",
  "password": "weak-password"
}
```

All requests to the `/api/blogs` or `/api/blogs/:id` require a valid JWT token in Authorization header `{"Authorization": "Bearer <YOUR_JWT_TOKEN>"}`  
POST `/api/blogs`

```json
{
  "title": "Go To Statement Considered Harmful",
  "author": "Edsger W. Dijkstra",
  "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  "likes": 5
}
```
