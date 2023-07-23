import { getJSON } from './helpers';
import { API_KEY, API_URL_GEO, API_URL_DATA } from './config';

const state = {
  city: {},
  weather: {},
};

const loadCity = async function (query) {
  try {
    const data = await getJSON(
      `${API_URL_GEO}${query}&limit=&appid=${API_KEY}`
    );

    //We are mutating state instead of returning data from this is function
    state.city = data.map(city => {
      return {
        name: city.name,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      };
    });
  } catch (err) {
    throw err;
  }
};

const loadWeather = async function (data) {
  try {
    const weather = await getJSON(
      `${API_URL_DATA}${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`
    );
    state.weather = weather;
  } catch (err) {
    throw err;
  }
};

export { state, loadCity, loadWeather };
