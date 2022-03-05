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
const verificarDatos = ( archivo ) => { 
    const result = {};

    result.numBits = archivo.numBit1 + archivo.numBit2; //Número de bits que ocupara la memoria.

    result.tamPag = 2**(archivo.direccionV.length - result.numBits) * archivo.tamPal;
    result.tamMemoriaV = 2**archivo.numBit1 * 2**archivo.numBit2 * result.tamPag;
    result.tamMemoriaF = 2**archivo.numBitMarco * result.tamPag;
    result.direccionV = archivo.direccionV;

    if(result.tamMemoriaV < archivo.tamMemF){
        console.log(`${'X'.red} Error: ${'La memoria virtual no puede ser más pequeña que la memoria física'.green}`)
        result.band = false;
        return result;
    }

    result.n1 = archivo.numBit1;
    result.n2 = archivo.numBit2;

    
    if(archivo['direccionV'].length <= result.numBits){
        console.log(`${'X'.red} Error: ${'Direccion de memoria virtual invalida.'.green}`);
        result.band = false
        return result;
    }
    result.band = true;
    return result;
}


const convertirDireccion = ( tablaPaginas, archivo, datos) => {

    const result = {};

    const { indiceN1, indiceN2 } = extraerIndices( archivo ); //Obtener los indices de la direccion de memoria

    const desplazamiento = archivo.direccionV.substring( archivo.numBit1 + archivo.numBit2 );

    let pagina = tablaPaginas[indiceN1][indiceN2].toString(2);
    pagina = formatoPagina( pagina, archivo.numBitMarco);
    
    const bitsInfo = pagina.substring(0,4);
    //
    const marcoPagina = pagina.substring(4, 4 + archivo.numBitMarco);
    result.datosEstado = extraerInformacion( bitsInfo );
    result.tamMemoriaV = datos.tamMemoriaV / 1024;
    result.tamMemoriaF = datos.tamMemoriaF / 1024;
    result.direccionV = datos.direccionV;
    result.tamPag = datos.tamPag;
    result.direccionF = marcoPagina + desplazamiento;
    result.numMarco = parseInt(marcoPagina,2);

    return result;
}

//Extrae los indices para cada nivel de la tabla de paginas
const extraerIndices = ({direccionV,numBit1,numBit2}) => {

    const result = {};

    result.indiceN1 = parseInt(direccionV.substring(0,numBit1),2);
    result.indiceN2 = parseInt(direccionV.substring(numBit1,numBit1 + numBit2),2);

    return result;
}

const extraerInformacion = (bits) => {
    let datos = {
        referido : 0,
        modificado : 0,
        permisos : 0,
        presente : 0
    };
    
    for(let i = 0;i < bits.length; i++){
        switch (i) {
            case 0:
                if(bits.charAt(i) == '1') datos.referido = 1;
                break;
            case 1:
                if(bits.charAt(i) == '1') datos.modificado = 1;
                break;
            case 2:
                if(bits.charAt(i) == '1') datos.permisos = 1;
                break;
            case 3:
                if(bits.charAt(i) == '1') datos.presente = 1;
                break;
        }
    }

    return datos;
}

const formatoPagina = ( pagina, bitsMarco ) => {

    let cadena = '';
    const bitsInformacion = 4;
    const cerosNecesarios = (bitsMarco + bitsInformacion) - pagina.length;

    for(let i = 0; i < cerosNecesarios; i++){
        cadena += '0';
    }

    return cadena + pagina;
}

module.exports = {
    verificarDatos,
    convertirDireccion
}