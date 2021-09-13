# React Weather App

A simple React weather app that displays weather information from the OpenWeatherMap API. It is displaying current and next 5 days weather forecast of current location provided by user (by default it will take Galway as current location). It will also display the current weather and diffence of the temperatures of city searched by user and the current city. This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

- Sign up over at [openweathermap.org](https://openweathermap.org/appid) to get an API key.
- Fork the project and clone it locally.
- Run the `npm install` in the project directory to install all the required dependencies for this project.
- Update the `src/config.js` file with your API_KEY:

```js
module.exports = {
  API_KEY: '',           // Required Field. 
  currentCity : '',      // Optional Field. By default it will take Galway
  refreshInterval: '',   // Optional Field. By default it will take 60000 (60000 ms = 1 min)
  unit: ''               // Optional Field. By default it will take metric (Options available:standard, metric & imperial)
}
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


