# Countries

In this exercise, we developed an application that displays data for various countries. The data is fetched from the REST API provided by University of Helsinki.

The user interface is straightforward. Users can search for a country by typing a query into the search field. Additionally, the application provides current weather information for the capital of the selected country.

## Running the Application

```bash
# Install the necessary dependencies
$ npm install

# To retrieve data from https://openweathermap.org/, you need to provide an API key. Create a `.env` file in the root directory of your project and add your API key there:
$ VITE_OPENWEATHER_API_KEY=<YOUR_API_KEY>

# Start the application
$ npm run dev
```

You can then access the application on: [http://localhost:5173/](http://localhost:5173/)
