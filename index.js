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
//Paquetes npm
const fs = require('fs-extra');
require('colors');

//Funciones propias
const {viewMenu, pausa, leerArchivo, leerDatos} = require('./helpers');
const { verificarDatos,convertirDireccion } = require('./funciones');


const main = async () => {

    let datos, result = {};
    let opcion = '0';
    let archivo;
    let nombreArchivo = "data.txt";

    do{
        opcion = await viewMenu();
        switch(opcion){
            case '1':
                let band = true;
                let tablaPaginas;

                if(!archivo){
                    console.log(`${'!'.red} No hay datos cargados`)
                    archivo = await leerArchivo();
                }

                do {

                    if(!archivo){
                        console.log(`${'X'.red} Error: Archivo no encotrado.`)
                        archivo = await leerArchivo();
                        continue;
                    }

                    console.log(`${'>'.green} Archivo encotrado.\n`)
                    console.log(archivo)
                    result = verificarDatos(archivo);

                    if(!result.band){
                        archivo = await leerArchivo();
                    }

                } while (!band);
                nombreArchivo = archivo.nombreArchivo;
                tablaPaginas = JSON.parse(fs.readFileSync(archivo.tablaPaginas)); //Leer tabla de paginas del archivo

                datosDireccion = convertirDireccion(tablaPaginas, archivo, result);

                console.clear();
                console.log(`Tamaño Memoria Fisica: ${(datosDireccion.tamMemoriaF + ' kB').green} ---- Tamaño Memoria Virtual: ${(datosDireccion.tamMemoriaV + ' kB').green} ---- Tamaño Pagina: ${(datosDireccion.tamPag + ' B').green}`);
                console.log(`Dirección de Memoria Virtual --> ${(datosDireccion.direccionV).green}`)
                console.log(`Dirección de Memoria Fisica --> ${(datosDireccion.direccionF).green}`);
                console.log(`Numero de Marco --> ${datosDireccion.numMarco.toString().green}`);
                console.log(`Referencia --> ${datosDireccion.datosEstado.referido == 1 ? 'Ha sido referenciada'.green : 'No ha sido referenciada'.red}`)
                console.log(`Permisos --> ${datosDireccion.datosEstado.permisos == 1 ? 'Lectura / Escritura'.green : 'Solo Lectura'.red}`);
                console.log(`Modificada --> ${datosDireccion.datosEstado.modificado == 1 ? 'Ha sido modificada'.green : 'No ha sido modificada'.red}`)
                console.log(`Presente --> ${datosDireccion.datosEstado.presente == 1 ? 'Esta presente'.green : 'Fallo de pagina!!'.red}`)
                break;
            case '2':
                archivo = await leerDatos(nombreArchivo);
                break;
            case '0':
                break;
        }

        if(opcion != '0') await pausa();
    }while(opcion != '0');

}

main();