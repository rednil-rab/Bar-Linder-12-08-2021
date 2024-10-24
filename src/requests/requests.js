import axios from 'axios';
import * as utils from '../utils';
import * as action from '../store/action';

export async function citySelection (item, dispatch, notify) {
  try {
    const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${item.key}?apikey=${utils.API_KEY}&language=en&details=true`);
    dispatch({ type: action.UPDATE_TEMPERATURE, celsius: response.data[0].Temperature.Metric.Value, fahrenheit: response.data[0].Temperature.Imperial.Value });
    dispatch({ type: action.UPDATE_CURRENT, value: response.data[0].WeatherText });
  } catch (error) {
    notify();
  }

}

export async function nextFiveDays(item, dispatch, notify) {
  try {
    const response2 = await axios.get(`${utils.ACCU_WEATHER_HOST}/forecasts/v1/daily/5day/${item.key}?apikey=${utils.API_KEY}&language=en&details=true&metric=true`);
    dispatch({ type: action.UPDATE_DAYS, value: utils.makeDayArray(response2.data.DailyForecasts) });
  } catch (error) {
    notify();
  }
}

export async function getCities(q, notify) {
  if (q === '' || q === null) {
    return [];
  }
  try {
    const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/locations/v1/cities/autocomplete?apikey=${utils.API_KEY}&q=${q}&language=en`);
    let temp = response.data.map(
      item => {
        return { value: item.AdministrativeArea.LocalizedName, label: item.AdministrativeArea.LocalizedName, key: item.Key };
      }
    );
    return temp;
  } catch {
    notify();
  }
 

}