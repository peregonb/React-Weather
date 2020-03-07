import * as Axios from "axios";

export const API = {
    getCity(cityId) {
        return Axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=34d1ca9e7e657c233b35ba304ec7621d&units=metric&lang=ru`)
            .then(response => response.data)
    },
};

