import * as Axios from "axios";

let apiKey = '34d1ca9e7e657c233b35ba304ec7621d',
    baseURL = 'https://api.openweathermap.org/data/2.5/',
    duplicatedParams = `appid=${apiKey}&units=metric&lang=ru`;

export const API = {
    getCity(cityId) {
        return Axios.get(`${baseURL}weather?id=${cityId}&${duplicatedParams}`)
            .then(response => response.data)
    },
    getWeeklyWeatherFromCity(cityId) {
        return Axios.get(`${baseURL}forecast?id=${cityId}&${duplicatedParams}`)
            .then(response => response.data)
    },
};

