// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Show Time Function
// Updates every second to change time every second
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Figure out if it's AM or PM and set
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Options
  const showAmPm = true;

  // 12-Hour Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('morning.jpg')";
    greeting.textContent = 'Good Morning';
    document.body.style.color = '#FFFFFA';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('afternoon.jpg')";
    greeting.textContent = 'Good Afternoon';
    document.body.style.color = '#FFFFFA';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('night.jpg')";
    greeting.textContent = 'Good Evening';
    document.body.style.color = '#FFFFFA';
  }
}

// Set Current Day
function getDay() {
  // DOM Elements
  let todayDate = document.getElementById('todayDate');
  // Month
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let today = new Date(),
    month = monthNames[today.getMonth()];
  console.log(month);
  // Day
  let day = today.getDate();
  console.log(day);
  // Year
  let year = today.getFullYear();
  console.log(year);

  todayDate.innerHTML = month + ' ' + day + ', ' + year;
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Display weather
function getWeather() {
  // DOM Elements
  let temperature = document.getElementById('temperature');
  let location = document.getElementById('location');
  let icon = document.getElementById('icon');

  // Define API key for API call
  let api = 'https://api.openweathermap.org/data/2.5/weather';
  let apiKey = 'f146799a557e8ab658304c1b30cc3cfd';

  // DOM element to display 'locating...' before user authorizes location access
  location.innerHTML = 'Locating...';

  // Geolocation Web API call
  navigator.geolocation.getCurrentPosition(success, error);

  // Geolocation on success (User approves location access)
  function success(position) {
    // Define location that geolocator gives
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Define URL to put into fetch API call
    let url =
      api +
      '?lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&appid=' +
      apiKey +
      '&units=imperial';

    // Fetch API call
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Temperature data
        let temp = data.main.temp;
        // Icon data
        let iconName = data.weather[0].icon;
        // icon 'src' url
        let iconUrl = `http://openweathermap.org/img/wn/${iconName}.png`;
        // Add temperature to the header tag with id='temperature'
        temperature.innerHTML = Math.round(temp) + '° F';
        // Add city to the header tag with id='location'
        location.innerHTML = data.name;
        // Add src to the <img> tag with id='icon'
        icon.src = iconUrl;
      });
  }

  // Geolocation on error (User denies location access)
  function error() {
    location.innerHTML = 'Unable to retrieve your location';
  }
}

// Get Weather Call
getWeather();

// Run Clock
showTime();

// Set Background and Greeting
setBgGreet();

// Set Current Day
getDay();

// Get Focus from Local Storage
getFocus();
