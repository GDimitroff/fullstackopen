# Phonebook

This project includes both the backend and a production build of the frontend application from `part2\phonebook`. The production build is located in the `dist` directory and is served as static content.

To integrate the `part2/phonebook` application with the backend, several modifications were made:

- The `json-server` and `db.json` file were removed as they are no longer required for development.
- The hardcoded backend URL was replaced with a relative URL.
- The `vite.config` file was updated to use a proxy for API requests.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# Create a `.env` file in the root directory of your project and add the `MONGODB_URI` and `PORT` variables
$ MONGODB_URI=<YOUR_MONGODB_URI>
$ PORT=3001

# Build the UI
$ npm run build:ui

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:3001/](http://localhost:3001/)  
You can then access the server on: [http://localhost:3001/api/persons](http://localhost:3001/api/persons)

The App is deployed via Fly.io at the following URL: https://fso2024-phonebook.fly.dev/
