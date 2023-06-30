import * as model from './model';
import WeatherView from './view';

const controlWeather = async function () {
  try {
    //Get query
    const query = WeatherView.getQuery();

    //Load city
    await model.loadCity(query);

    const { city } = model.state;
    const [data] = city;

    //Load Weather
    await model.loadWeather(data);

    //render weather
    WeatherView.render(model.state.weather, data.state);
  } catch (err) {
    console.error(err);
    WeatherView.renderError();
  }
};

const init = function () {
  WeatherView.addHandlerRender(controlWeather);
  //focus on input field
  WeatherView.focus();
};
init();
