# Routed Anecdotes

In this exercise, we've revamped the anecdote voting application from `Part 1`, incorporating React Router for better navigation.

Previously, the application's URL remained static, regardless of the view being displayed. This was suboptimal, as ideally, each view should have its own unique URL to facilitate actions like bookmarking. Furthermore, as the application evolves to include individual views for the anecdote list, anecdote details, and the creation of new anecdotes, managing navigation without a routing solution could become complex and inefficient.

To address these issues, we've integrated [React Router](https://reactrouter.com/en/main) into our application.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Start the application
$ npm run dev
```

You can then access the app on: [http://localhost:5173/](http://localhost:5173/)
