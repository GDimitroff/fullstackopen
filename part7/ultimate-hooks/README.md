# Ultimate hooks

In this exercise, we are refactoring [this app](https://github.com/fullstack-hy2020/ultimate-hooks) using custom hooks. The initial list of notes and persons are stored in the `db.json` file. This file is utilized by `JSON Server`, a tool that emulates a backend server for data storage.

However, we noticed that the same code responsible for fetching notes from the backend could be reused in the blog post application. Indeed, only the `baseUrl` differs. As a result, we extracted the code for communicating with a backend server into its own `useResource` hook.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Start the backend JSON server in separate terminal
$ npm run server

# Start the application
$ npm run dev
```

You can then access the app on: [http://localhost:5173/](http://localhost:5173/)
