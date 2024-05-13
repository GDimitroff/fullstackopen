# phonebook application

This project contains the backend and the production build of the frontend app from `part2\phonebook` (placed in `dist` directory, served as static content).

Few changes were made to the frontend app to make it work with the backend:

- The `json-server` module and `db.json` file were removed (no longer needed for development)
- The hardcoded backend URL is changed to a relative URL
- vite.config changed to use proxy for API requests

## live demo

The App is deployed via Fly.io at the following URL: https://fso2024-phonebook.fly.dev/
