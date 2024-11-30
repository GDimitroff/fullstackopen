## Running the Application

You must first start the backend server from the `part11/bloglist` directory:

```bash
# Navigate to the backend server directory
$ cd part11/bloglist

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

Then, in a new terminal window, navigate back to `part11/bloglist/ui` directory and do the following:

```bash
# Navigate to the frontend directory
$ cd part11/bloglist/ui

# Install the necessary dependencies
$ npm install

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)
