'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*const getCountry = country => {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/italy`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country 1
    renderCountry(data);

    const vicino = data.borders?.[0];

    if (!vicino) return;

    //Seconda chiamata
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${vicino}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);

      renderCountry(data);

      const vicino = data.borders?.[0];
      if (!vicino) return;

      const request3 = new XMLHttpRequest();
      request3.open('GET', `https://restcountries.com/v3.1/alpha/${vicino}`);
      request3.send();
      request3.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
      });
    });
  });
};
*/
const renderCountry = data => {
  const html = `
    <article class="country">
    <img class="country__img" src="${data.flags?.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name?.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>POP ${(
        +data.population / 1000000
      ).toFixed(1)}</p>
   
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      response.json();
      if (!response.ok) throw new Error('Country not found');
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(error => renderError(error.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const promessa = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() * 10 > 3) {
      resolve('You win');
    } else {
      reject('You lose');
    }
  }, 3000);
});

promessa
  .then(response => console.log(response))
  .catch(error => console.log(error));

btn.addEventListener('click', function () {});
*/

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereIAm = () => {
  getPosition()
    .then(position => {
      console.log(position);
      const { latitude: lat, longitude: long } = position.coords;
      console.log(lat, long);
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Coordinate errate');
      return response.json();
    })
    .then(city => {
      return fetch(`https://restcountries.com/v3.1/alpha/${city}`);
    })
    .then(response => {
      if (!response) throw new Error('City not exists');
      return response.json();
    })
    .then(result => renderCountry(result[0]))
    .catch(error => console.log(error));
};

btn.addEventListener('click', whereIAm);
