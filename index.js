require('dotenv').config();
const cap = require('capitalize');

const {leerInput,inquirerMenu,pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt = 0;

    do{

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad( lugar );
                const idSeleccionado = await listarLugares(lugares);

                if(idSeleccionado == 0) continue; 

                const lugarSeleccionado = lugares.find( l => l.id === idSeleccionado);

                busquedas.agregarHistorial( lugarSeleccionado.nombre );


                const climaLugarSeleccionado = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                console.log('\nInformación de la Ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', climaLugarSeleccionado.temp);
                console.log('Mínima:', climaLugarSeleccionado.min);
                console.log('Máxima:', climaLugarSeleccionado.max);
                console.log('Cómo está el clima:', climaLugarSeleccionado.desc);

                
                
            break;
            case 2:

                busquedas.historial.forEach( (lugar, i ) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ cap.words(lugar) } `)
                });
                 
            break;
        }

        if( opt!==0 ) await pausa();

    }while( opt != 0 )


}

main();