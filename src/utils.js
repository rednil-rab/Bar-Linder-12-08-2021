import sunny from './images/sunny.svg';
import cloudy from './images/cloudy.svg';
import rainny from './images/rain.svg';

export const ACCU_WEATHER_HOST = 'https://dataservice.accuweather.com';
// export const API_KEY = 'ALY2AtsDuGp5HjSxZkHRZsfOiWmAtVco';
export const API_KEY = 'GU2OTPQUz1mECqPOZOVdshtwt64h4pD5';
export const weekDayConvertor = new Array(7);
weekDayConvertor[0] = "Sunday";
weekDayConvertor[1] = "Monday";
weekDayConvertor[2] = "Tuesday";
weekDayConvertor[3] = "Wednesday";
weekDayConvertor[4] = "Thursday";
weekDayConvertor[5] = "Friday";
weekDayConvertor[6] = "Saturday";

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
}

export const cToF = (celsius) => {
	var cTemp = celsius;
	var cToFahr = cTemp * 9 / 5 + 32;
	return cToFahr
}

export const checkForMatch = (array, obj) => {
	// let bool = array.isArray(obj)
	// return bool
}

export const containsObject = (list, obj) => {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i].key === obj.key) {
			return true;
		}
	}
	return false;
}

const sun = new RegExp('/sun/');
const cloud = new RegExp('/cloud/');
const rain = new RegExp('/rain/');


const checkSun = (string) => {
	if (string.toLowerCase().includes('sun')) {
		return true
	} else {
		return false
	}
}

export const imageDispenser = (string) => {

	try {
		switch (true) {

			case string.toLowerCase().includes('sun'):
				return sunny
			case string.toLowerCase().includes('rain'):
				return rainny
			default:
				return cloudy
		}
	} catch {
		return cloudy
	}

}