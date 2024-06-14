# Library GraphQL Server

Through the exercises, we will implement a GraphQL backend for a small library.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Create a `.env` file in the root directory of your project and add the following environment variables.
# For convenience we set all users to have the same valid password so we can focus on GraphQL
$ MONGODB_URI=<YOUR_MONGODB_URI>
$ JWT_SECRET=<YOUR-JWT-SECRET>
$ USER_PASSWORD=<YOUR-USER-PASSWORD>


# Start the server
$ npm run dev
```

You can then access the Apollo Studio Explorer on: http://localhost:4000/graphql. This is very useful for a developer, and can be used to make queries to the server.
