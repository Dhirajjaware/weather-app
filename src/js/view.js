class WeatherView {
  //These are private fields
  #parentEl = document.querySelector('.search');
  #weatherContainer = document.querySelector('main');
  #errorMessage = 'City not found! Please try again';

  getQuery() {
    const query = this.#parentEl.querySelector('.input__city').value;
    this.#clearInputField();
    return query;
  }

  #clearInputField() {
    this.#parentEl.querySelector('.input__city').value = '';
  }

  #clearContainer() {
    this.#weatherContainer.innerHTML = '';
  }

  focus() {
    this.#parentEl.querySelector('.input__city').focus();
  }

  addHandlerRender(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }

  showContainer() {
    this.#weatherContainer.style.opacity = 1;
  }

  render(data, state = '') {
    console.log(data);
    const { temp, feels_like } = data.main;
    const { speed } = data.wind;
    const [weather] = data.weather;

    const html = `<div class="container-fluid weather__container">
        <div class="col text-center">
          <h2 class="Weather__city">${data.name},${state}</h2>
          <p>Now</p>
          <h1 class="weather__celsius">${temp.toFixed(0)}°c</h1>
          <h4 class="weather__celsius-feels">Feels like ${feels_like.toFixed(
            0
          )}°c</h4>
          <h3 class="mt-5">Mostly ${weather.main}</h3>
          <h4 class="mt-4">wind</h4>
          <p class="weather__wind">${Math.round(speed * 3.6)}km/h</p>
        </div>
      </div>
      `;

    this.#clearContainer();
    this.#weatherContainer.insertAdjacentHTML('afterbegin', html);
    this.showContainer();
  }

  renderError(error = this.#errorMessage) {
    this.showContainer();
    this.#weatherContainer.innerText = error;
  }
}

//We are creating instance of weather class
export default new WeatherView();
