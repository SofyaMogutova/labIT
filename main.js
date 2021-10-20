function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}

const welcomeText = document.querySelector('#welcomeText');
const countText = document.querySelector('#countText');
const dateText = document.querySelector('#dateText');
const nameCookie = document.querySelector('#nameCookie');
const registrationButton = document.querySelector('#registrationButton');
const clearButton = document.querySelector('#clearButton');
const exitButton = document.querySelector('#exitButton');

if(getCookie('name') === undefined){
    welcomeText.innerHTML = "Зарегистрируйтесь";
}
else{
    welcomeText.innerHTML = "Привет, " + getCookie('name');
}

let count = getCookie('count');
if(count === undefined){
    count = 0
}

setCookie('count', ++count);
countText.innerHTML = "Вы были на этой странице: " + getCookie('count') + " раз";

if(getCookie('date') === undefined){
    setCookie('date', new Date().getTime());
    dateText.value = "";
}
else{
    let currentDate = new Date();
    let previousDate = new Date(Number(getCookie('date')));
    let delay = currentDate - previousDate;
    let months = Math.floor(delay / (30 * 24 * 60 * 60 * 1000));
    let days = Math.floor(delay / (24 * 60 * 60 * 1000)) % 30;
    let hours = Math.floor(delay / (60 * 60 * 1000)) % 24;
    let minutes = Math.floor(delay / (60 * 1000)) % 60;
    let secunds = Math.floor(delay / 1000) % 60;
    dateText.innerHTML = "Вы заходили на эту страницу: " + months  + " месяцев " + days + " дней " + hours + " часов " + minutes + " минут " + secunds + " секунд назад";
    setCookie('date', new Date().getTime());
}

registrationButton.addEventListener('click', (event) => {
    setCookie('name', nameCookie.value);
    welcomeText.innerHTML = "Привет, " + getCookie('name');
})

clearButton.addEventListener('click', (event) => {
    setCookie('count', 0);
    countText.innerHTML = "Вы ещё не были на этой странице";
})
exitButton.addEventListener('click', (event) => {
    welcomeText.innerHTML = "Зарегистрируйтесь";
    setCookie('count', 0);
    countText.innerHTML = "Вы ещё не были на этой странице";
    dateText.innerHTML = "";
})
