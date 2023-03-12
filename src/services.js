import { WEATHER_URL, WEATHER_API } from "./components/constants";

export class WeatherService {
   async fetchFiveDayForecast() {
      return new Promise( async (success, failure) => {
         try {
            const response = await fetch(`${WEATHER_URL}${WEATHER_API}`);
            if (response.ok) {
               const json = await response.json();
               const data = json.list
               .filter((day) => day.dt_txt.includes('00:00:00'))
               // console.log(data);
               .map((item) => ({
                 temp: item.main.temp,
                 dt: item.dt,
                 date: item.dt_txt,
                 imgId: item.weather[0].id,
                 desc: item.weather[0].description,
                 feelsLike: item.main.feels_like,
                 humidity: item.main.humidity,
                 windSpeed: item.wind.speed,
               }));
               success({response, data})
            } else {
               failure({error: 'Invalid http request'})
            }
         } catch(error) {
            failure(error)
         }
      })
   }
}