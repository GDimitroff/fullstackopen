# Bloglist Frontend

This is a refactored version of the Bloglist application, originally developed in `Part4` and `Part5`. We've incorporated Tanstack Query for asynchronous state management. For authentication and notification state, we've utilized React Context in conjunction with the useReducer hook. React Router has been employed for conditional rendering of components based on the browser's URL. The application's styling was accomplished using the Material UI component library.

It's assumed that a user already exists in the database with valid credentials. If not, please refer to `Part 4` for instructions on creating a new user via the API.

## Running the Application

You must first start the backend server from the `part4/bloglist` directory:

```bash
# Navigate to the backend server directory
$ cd part4/bloglist

# Install the necessary dependencies
$ npm install

# Create a `.env` file in the root directory of your project and add the following environment variables
$ MONGODB_URI=<YOUR_MONGODB_URI>
$ TEST_MONGODB_URI=<YOUR_TEST_MONGODB_URI>
$ SECRET=<YOUR_SECRET>
$ PORT=3001

# Start the server
$ npm run dev
```

Then, in a new terminal window, navigate back to `part7/bloglist` directory and do the following:

```bash
# Navigate to the frontend directory
$ cd part7/bloglist

# Install the necessary dependencies
$ npm install

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)
