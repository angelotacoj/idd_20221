// const fs = require('fs');
// const oracledb = require('oracledb');
// const dbConfig = require('./dbconfig.js');

import * as fs from 'fs';
import oracledb from 'oracledb'
import { dbConfig } from './dbconfig.mjs'


let libPath;
if (process.platform === 'win32') {           // Windows
    libPath = 'C:\\oracle\\instantclient_19_12';
} else if (process.platform === 'darwin') {   // macOS
    libPath = process.env.HOME + '/Downloads/instantclient_19_8';
}
if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({ libDir: libPath });
}

async function runSelect(query) {
    let conn

    try {
        conn = await oracledb.getConnection(dbConfig)
        const result = await conn.execute(query)
        return result
    } catch (err) {
        console.error('err 1 =', err)
    } finally {
        try {
            if (conn) await conn.close()
        } catch (err) {
            console.error('err 2 =', err)
        }
    }
}

async function runInsert(query) {
    let conn

    try {
        conn = await oracledb.getConnection(dbConfig)
        const result = await conn.execute(query,
            [],
            {autoCommit: true}
            )
        return result
    } catch (err) {
        console.error('err 1 =', err)
    } finally {
        try {
            if (conn) await conn.close()
        } catch (err) {
            console.error('err 2 =', err)
        }
    }
}

async function runUpdate(query) {
    let conn

    try {
        conn = await oracledb.getConnection(dbConfig)
        const result = await conn.execute(query,
            [],
            {autoCommit: true}
            )
        return result
    } catch (err) {
        console.error('err 1 =', err)
    } finally {
        try {
            if (conn) await conn.close()
        } catch (err) {
            console.error('err 2 =', err)
        }
    }
}

// Workshop - Talleres

async function createNewWorkshop(){
    const newWorkshop = await runInsert(`INSERT INTO TALLER VALUES('01_03','11AM','5PM',TO_DATE('11/09/2021', 'DD/MM/YYYY'),'trompo','taller trompo','1','2020')`)
    console.log('newWorkshop =', newWorkshop)
}

async function updateWorkshop(){
    const updateWorkshop = await runInsert(`UPDATE TALLER SET NOMBRE_TALLER ='NATACION', DESCRIPCION='TRAER GORRO Y LENTES DE BUZEO' WHERE COD_TALLER='01_02'`)
    console.log('updateWorkshop =', updateWorkshop)
}

export async function getAllWorkshops() {
    const workshops = await runSelect('SELECT * FROM TALLER')
    console.log('workshops =', workshops)
    return '<h1>Talleres</h1>'
}

// Comando de prueba, Funcion que imprime al estudiante junto a su apoderado

async function getStudentsAndAttorney() {
    const studentsAndAttorney = await runSelect(`SELECT UPPER(U.NOMBRES_NOMBRE || ' ' || U.APELLIDOP_NOMBRE || ' ' || U.APELLIDOM_NOMBRE) AS FULLNAME, A.DP_DATOSAPODERADO
    FROM USUARIO U
    INNER JOIN ALUMNO A 
    ON U.DNI = COD_ALUMNO`)
    console.log('studentsAndAttorney =', studentsAndAttorney)
}

// Insertar notas - Ver notas

// CREAR NUEVAS NOTAS
async function createNewMark(){
    const newMark = await runInsert(``)
    console.log('newMark =', newMark)
}

// MOSTRAR TODAS LAS NOTAS ASIGNADAS POR UN DOCENTE 
async function getAllMarksFromTeacher() {
    const marksByTeacher = await runSelect(`SELECT UPPER(UP.NOMBRES_NOMBRE || ' ' || UP.APELLIDOP_NOMBRE || ' ' || UP.APELLIDOM_NOMBRE) AS FULLNAME_DOCENTE, S.NOMBRE_SECCION, N.VALOR, 
    UPPER(UA.NOMBRES_NOMBRE || ' ' || UA.APELLIDOP_NOMBRE || ' ' || UA.APELLIDOM_NOMBRE) AS FULLNAME_ALUMNO
    FROM USUARIO UP
    INNER JOIN PROFESORES P
    ON UP.DNI = P.COD_DOCENTE
    INNER JOIN PROFESOR_TUTOR PT
    ON P.COD_DOCENTE = PT.COD_DOCENTE
    INNER JOIN SECCION S 
    ON S.COD_DOCENTE = PT.COD_DOCENTE
    INNER JOIN NOTA N
    ON N.NOMBRE_SECCION = S.NOMBRE_SECCION
    INNER JOIN ALUMNO A
    ON N.COD_ALUMNO = A.COD_ALUMNO
    INNER JOIN USUARIO UA
    ON A.COD_ALUMNO = UA.DNI
    WHERE P.COD_DOCENTE = '20101001'`)
    console.log('marksByTeacher =', marksByTeacher)
}

// SCRIPT PARA VER LAS NOTAS X ALUMNO
async function getAllMarksByStudent(){
    const marksByStudent = await runSelect(`SELECT U.DNI, UPPER(U.NOMBRES_NOMBRE || ' ' || U.APELLIDOP_NOMBRE || ' ' || U.APELLIDOM_NOMBRE) AS FULLNAME , S.NOMBRE_SECCION, N.AREA, N.VALOR
    FROM USUARIO U
    INNER JOIN ALUMNO A
    ON U.DNI = A.COD_ALUMNO
    INNER JOIN SECCION S 
    ON S.COD_ALUMNO = A.COD_ALUMNO
    INNER JOIN NOTA N 
    ON S.NOMBRE_SECCION = N.NOMBRE_SECCION
    WHERE A.COD_ALUMNO='30101001'`)
    console.log('marksByStudent =', marksByStudent)
}




// --------LAMADA DE FUNCIONES -----//
// createNewWorkshop()
// getAllWorkshops()
// getStudentsAndAttorney() 
//updateWorkshop()
// getAllMarksFromTeacher()
// getAllMarksByStudent()
