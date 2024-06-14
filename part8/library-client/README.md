# Library GraphQL Client

Through these exercises, we'll implement a frontend for the GraphQL library.

## Running the Application

You must first start the backend GraphQL server from the `part8/library-server` directory:

```bash
# Navigate to the backend server directory
$ cd part8/library-server

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

Then, in a new terminal window, navigate back to `part8/library-client` directory and do the following:

```bash
# Navigate to the frontend directory
$ cd part8/library-client

# Install the necessary dependencies
$ npm install

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)
