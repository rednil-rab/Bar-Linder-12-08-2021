import sunny from './images/sunny.svg';
import cloudy from './images/cloudy.svg';
import rainny from './images/rain.svg';

export const ACCU_WEATHER_HOST = 'https://dataservice.accuweather.com';
export const API_KEY = 'ALY2AtsDuGp5HjSxZkHRZsfOiWmAtVco';
// export const API_KEY = 'GU2OTPQUz1mECqPOZOVdshtwt64h4pD5';
// export const API_KEY = 'OjjecWaBfDrQauHwSlDuGTKjwZLZCXm6';
// export const API_KEY = 'fzGigpqW5XWJWlLMkw8m4HFusxI3gaQo';
// export const API_KEY = 'nmMZBObVPEUUAOHrgJXyOAA1XVhtOTP1';

export const weekDayConvertor = new Array(7);
weekDayConvertor[0] = 'Sunday';
weekDayConvertor[1] = 'Monday';
weekDayConvertor[2] = 'Tuesday';
weekDayConvertor[3] = 'Wednesday';
weekDayConvertor[4] = 'Thursday';
weekDayConvertor[5] = 'Friday';
weekDayConvertor[6] = 'Saturday';

export const debounce = (func, wait, immediate) => {
  let timeout;

  return function () {

    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const ID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

export const cToF = (celsius) => {
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr;
};

export const containsObject = (list, obj) => {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].key === obj.key) {
      return true;
    }
  }
  return false;
};

export const imageDispenser = (string) => {

  try {
    switch (true) {

      case string.toLowerCase().includes('sun'):
        return sunny;
      case string.toLowerCase().includes('rain'):
        return rainny;
      case string.toLowerCase().includes('clear'):
        return sunny;
      default:
        return cloudy;
    }
  } catch {
    return cloudy;
  }

};

export const makeDayArray = (array) => {
  let days = array.map(day => {
    let weekday = new Date(day.Date);
    return {
      weekday: weekDayConvertor[weekday.getDay()],
      celsius: Math.ceil(day.Temperature.Maximum.Value) ,
      fahrenheit: cToF(Math.ceil(day.Temperature.Maximum.Value)),
      condition: day.Day.IconPhrase
    };
  });
    
  return days;
};