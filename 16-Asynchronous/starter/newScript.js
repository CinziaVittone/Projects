'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');
////////////////////////////////////////////////
/*
const getCountryAndNeighbour = country => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data, 'country');

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      renderCountry(data, 'neighbour');
    });
  });
};
*/
const renderCountry = (data, classe) => {
  const html = ` <article class='${classe}'>
    <img class="country__img" src="${data.flags?.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
          `${data.cioc}`
        ).format(data.population)} people</p>        
    </div>
    </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = error => {
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentText('beforeend', error.message);
};

const getJSON = (url, errorMessage = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

const getCountryData = country => {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0], 'country');
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No country neighbour found');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country neighbour not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(error => renderError('Something went wrong: ' + error.message))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('italy');
});

// const whereAmI = () => {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=21704334081541925532x11023`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geolocation ${response.status}`);
//       return response.json();
//     })
//     .then(data => fetch(`https://restcountries.com/v3.1/name/${data.country}`))
//     .then(response => {
//       if (!response.ok) throw new Error('Country not found');
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(error => alert(error.message));
// };
/**
const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );

    //SONO la stessa cosa
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//Promise.race

(async () => {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/peru`),
    getJSON(`https://restcountries.com/v3.1/name/argentina`),
  ]);
  console.log(response[0]);
})();

const timeout = seconds => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, seconds * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  timeout(0),
])
  .then(response => console.log(response))
  .catch(error => console.error(error));

//Promise allSetteld

const getCountries = async () => {
  const response = await Promise.allSettled([
    getJSON(`https://restcountries.com/v3.1/name/asdf`),
    getJSON(`https://restcountries.com/v3.1/name/peru`),
    getJSON(`https://restcountries.com/v3.1/name/argentina`),
  ]);

  console.log(response);
};

getCountries();

//Promise any

const promiseAny = async () => {
  const response = await Promise.any([
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/peru`),
    getJSON(`https://restcountries.com/v3.1/name/argentina`),
  ]);

  console.log(response[0]);
};

promiseAny();
 */
/**
const whereAmI = async () => {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const responseCity = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=21704334081541925532x11023`
    );

    if (!responseCity) throw new Error('Problem getting location data');
    const city = await responseCity.json();

    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/name/${city.country}`
    );
    if (!responseCountry) throw new Error('Problem getting country data');
    const country = await responseCountry.json();
    renderCountry(country[0]);

    return `You are in ${city.city}`;
  } catch (error) {
    renderError(error);
    throw error;
  }
};
console.log('1: I will get location');
(async () => {
  try {
    const response = await whereAmI();
    console.log(`2: ${response}`);
  } catch (error) {
    renderError(error.message);
  }
  console.log('3: Finish getting location');
})();
 */
/**
const get3Countries = async (country1, country2, country3) => {
  try {
    const promises = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${country1}`),
      getJSON(`https://restcountries.com/v3.1/name/${country2}`),
      getJSON(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    const [[data1], [data2], [data3]] = promises;

    console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  } catch (error) {
    throw error;
  }
};

get3Countries('italy', 'germany', 'spain');
 */
/**
const lotteryPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.round(Math.random()) > 0) {
      resolve('You win');
    } else {
      reject(new Error('You loose'));
    }
  }, 2000);
});


lotteryPromise
  .then(response => console.log(response))
  .catch(error => console.log(error));

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`I waited for ${seconds} seconds`);
    }, seconds * 1000);
  });
};

wait(1)
  .then(response => {
    console.log(response);
    return wait(2);
  })
  .then(response => {
    console.log(response);
    return wait(3);
  })
  .then(response => console.log(response));

Promise.resolve('resolved').then(response => console.log(response));
Promise.reject('rejected').catch(response => console.log(response));
 */
/**
//Callback Queue - Microtask Queue
console.log('Test start');
setTimeout(() => console.log('0 second timer'), 0);
Promise.resolve('Resolved promise 1').then(response => console.log(response));
Promise.resolve('Resolved promise 2').then(response => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(response);
});
console.log('Test end');
 */
//Coding Challenge 1
/**
whereAmI(52.508, 13.381);
setTimeout(() => {
  whereAmI(-36.38922, 148.65293);
}, 2000);
setTimeout(() => {
  whereAmI(-33.933, 18.474);
}, 4000);

// 52.508, 13.381;
// 19.037, 72.873
// - 33.933, 18.474;
 */
//Coding Challenge 2
/**
const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('image not found'));
    });
  });
};

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImg;

createImage('./img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .finally(() => {
    currentImg.style.display = 'none';
  })
  .catch(error => alert(error));
 */

//Coding Challenge 3
const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('image not found'));
    });
  });
};

const loadNPause = async () => {
  try {
    let img = await createImage('./img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('./img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('./img/img-3.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    throw error;
  }
};

const loadAll = async imgArr => {
  const imgs = imgArr.map(async img => await createImage(img));

  console.log(imgs);

  const response = await Promise.allSettled(imgs);
};

const wait = second => {
  return new Promise(resolve => {
    setTimeout(resolve, second * 1000);
  });
};

// loadNPause();
loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);
