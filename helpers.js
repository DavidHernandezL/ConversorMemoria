/*
    Practica 3: Transformación de dirección memoria virtual a física
    Equipo 9
    Integrantes: 
        Armando Enríquez Puga - 201860357
        David Hernández López - 201929788
        Mario André Hernández Pérez - 201862157
        Octavio Augusto Martínez Reyes - 201904948
        Carlos Martin Ventura Guevara - 201909842
*/

const inquirer = require('inquirer');
const fs = require('fs-extra');
require('colors');

const viewMenu = async () => {
    
    console.clear();

    const opcionMultiple = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Convertir direccion de memoria virtual a física`
                },
                {
                    value: '2',
                    name: `${'2.'.green} Cambiar datos de entrada`
                },
                {   
                    value: '0',
                    name: `${'3.'.green} Salir`
                }
            ]
        }
    ]
    console.log('====================================='.white);
    console.log(' Conversor de direcciones de memoria'.blue);
    console.log('====================================='.white);

    const {opcion} = await inquirer.prompt(opcionMultiple);
    return opcion;
}

const pausa = async () => {
    const enter = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiona ${'ENTER'.red} para continuar`
        }
    ]
    console.log('');
    await inquirer.prompt(enter);
}
const leerArchivo = async () => {

    const pregunta = [
        {
            type: 'input',
            name: 'nombreArchivo',
            message: 'Ingrese el nombre del archivo: '
        }
    ]
    const {nombreArchivo} = await inquirer.prompt(pregunta);
    try {
        const data = JSON.parse(fs.readFileSync(nombreArchivo))
        data.nombreArchivo = nombreArchivo;
        return data;
    } catch (error) {
        return false
    }
}

const leerDatos = async ( nombreArchivo ) => {
    const preguntas = [
        {
            type: 'input',
            message: 'Ingrese la direccion virtual: ',
            name: 'direccionV'
        },
        {
            type: 'number',
            message: 'Ingrese el numero de bits para el primer nivel: ',
            name: 'numBit1'
        },
        {
            type: 'number',
            message: 'Ingrese el numero de bits para el segundo nivel: ',
            name: 'numBit2'
        },
        {
            type: 'number',
            message: 'Ingrese el numero de bits para el marco de pagina: ',
            name: 'numBitMarco'
        },
        {
            type: 'number',
            message: 'Ingrese el tamaño de palabra: ',
            name: 'tamPal'
        },
        {
            type: 'input',
            message: 'Ingrese el nombre del archivo de tabla de paginas: ',
            name: 'tablaPaginas'
        }
    ];

    const nuevosDatos = await inquirer.prompt(preguntas);
    fs.writeFileSync(nombreArchivo,JSON.stringify(nuevosDatos))
    return nuevosDatos;
}
module.exports = {
    viewMenu,
    pausa,
    leerArchivo, 
    leerDatos
}