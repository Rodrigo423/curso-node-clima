const inquirer = require ('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('=================='.green);
    console.log(' Seleccione una opcion'.white);
    console.log('==================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async() => {

    const optPausa = {
        type: 'input',
        name: 'enter',
        message: `\nPresione ${'ENTER'.green} para continuar\n`
    }

    const {opcion} = await inquirer.prompt(optPausa);

    return true;
} 

const leerInput = async(message)=>{
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;

}
const borrarMenu = async(tareas) => {

    let listadoTareas = [];

    let i = 0;
    tareas.listadoArr.forEach(tarea => {
            
        listadoTareas.push(
            {
                value: i.toString(),
                name: `${(i+1).toString().green} ${tarea.desc}`
            }
        );

        i++;
    });

    if(listadoTareas.length < 1){
        return false;
    }

    let menuTareas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Lista de Tareas: ',
            choices: listadoTareas
        }
    ];

    console.clear();
    console.log('=================='.green);
    console.log(' Seleccione la opción a eliminar'.white);
    console.log('==================\n'.green);

    const {opcion} = await inquirer.prompt(menuTareas);

    return +opcion;

}


const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => { 

        const idx = `${ i + 1 }.`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarMenu,
    confirmar,
    listarLugares
}