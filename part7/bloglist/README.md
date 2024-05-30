# Bloglist Frontend

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

## Testing the Application

In order to run the tests, you must follow these steps:

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

# Start the server in test mode
$ npm run start:test

# In a new terminal window, navigate to frontend directory
$ cd part7/bloglist

# Install the necessary dependencies
$ npm install

# Start the frontend application
$ npm run dev

# Run the unit tests
$ npm run test:unit

# Run the E2E tests
$ npm run test
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)
