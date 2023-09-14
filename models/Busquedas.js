const fs = require('fs');
const axios = require('axios');



class Busquedas {

    historial =[];
    pathDb = './db/database.json'

    constructor(){
        this.leerDB();
    }

    async ciudad( lugar = '') {
        //peticion http

        //console.log(lugar); 

        try {

            //petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params:{
                    'proximity' : 'ip',
                    'language' : 'es',
                    'access_token' : process.env.MAPBOX_KEY,
                    'limit' : '5',
                }
            });

            const resp = await instance.get();
            
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

        } catch (error) {
            return [];
        }


         //retornar los lugares 
    }

    async climaLugar( lat, lon ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:{
                    'lat' : lat,
                    'lon' : lon,
                    'appid' : process.env.OPENWEATHER_KEY,
                    'units' : 'metric',
                    'lang' : 'es'
                }
            });

            const resp = await instance.get();

            let {
                weather: [
                  { description: desc }
                ],
                main: {
                  temp: temp,
                  temp_min: min,
                  temp_max: max,
                }
            } = resp.data;

            return {desc,temp,min,max};

        } catch (error) {
            return [];
        }
    }

    agregarHistorial(lugar = ''){
        //prevenir duplicados

        if(this.historial.includes( lugar.toLocaleLowerCase() )){
            return;
        }

        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.grabarDb();
        //grabar db

    }

    grabarDb(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.pathDb, JSON.stringify( payload ))
    }

    leerDB(){

        if( this.historial.length != 0 ) return;
        this.historial = JSON.parse(fs.readFileSync(this.pathDb,{encoding:'utf-8'})).historial;
    }

}


module.exports = Busquedas;