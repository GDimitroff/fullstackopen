# Phonebook

This application serves as a simple phonebook where users can add, update, and delete contacts, each consisting of a unique name and associated phone number. A search field is also provided to filter contacts by name.

Initially, the application used a `db.json` file, which acted as a mock database of users and their numbers. This file was used in conjunction with `JSON Server` to simulate a backend server. However, these have been replaced with a backend server located in the `part3/phonebook` directory.

## Running the Application

You must first start the backend server from the `part3/phonebook` directory:

```bash
# Navigate to the backend server directory
$ cd part3/phonebook

# Install the necessary dependencies
$ npm install

# Start the server
$ npm run dev
```

Then, in a new terminal window, navigate back to `part2/phonebook` directory and do the following:

```bash
# Navigate to the frontend directory
$ cd part2/phonebook

# Install the necessary dependencies
$ npm install

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)

You can then access the server on: [http://localhost:3001/api/persons](http://localhost:3001/api/persons)
