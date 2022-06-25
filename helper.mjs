// const fs = require('fs');
// const oracledb = require('oracledb');
// const dbConfig = require('./dbconfig.js');

import { Console } from 'console';
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
    const workshops = await runSelect(`SELECT COD_TALLER, NOMBRE_TALLER, DESCRIPCION, FECHA, UPPER(HORA_INICIO || ' - ' || HORA_FINAL) AS HORA FROM TALLER`)
    const headers = workshops.metaData
    const rows = workshops.rows
    //console.log('headers =', headers)

    let htmlHead = ''
    for (const header of headers){
        const nameHTML = '<th scope="col">' + header.name + '</th>'
        htmlHead = htmlHead + nameHTML
        //console.log(nameHTML)
    }
    //console.log(htmlHead)

    let htmlRowWS = ''
    for (const row of rows){  
        let htmlRow = ''
        for(const elem of row){
            const td_html = `<td>`+ elem +`</td>`
            htmlRow = htmlRow + td_html
        }
        const tr_html = `<tr>`+ htmlRow +`</tr>`
        htmlRowWS = htmlRowWS + tr_html
    }
    
    console.log(htmlRowWS)
    // console.log(htmlRowWS)
    // console.log("")
    // console.log(htmlRow)


    console.log('workshops =', workshops)
    return `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="style.css">
            <title>Document</title>
        </head>
        <body>
            <nav class="border-bottom">
                <img src="media/139191135_3819700778053406_7422346157977545339_n.png" alt="" style="width: 60px; height: 60px;">
                <div class="d-flex flex-column justify-content-center ms-3">
                    <h5 >SISTEMA ESCOLAR</h5>
                    <h6>Editar perfil</h6>
                </div>
                <a href="login.html" style="margin-left: auto; display: flex; padding: 10px; text-decoration: none;" >
                    <button type="button" class="btn btn-info">Menu principal</button>
                </a>
            </nav>
            <div class="container" id="borde">

                <div class="row">
                    <div class="col-9">
                        <h3>Talleres</h3>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    ${htmlHead}
                                </tr>
                            </thead>
                            <tbody>
                                ${htmlRowWS}
                            </tbody>
                        </table>

                    </div>
                </div>
                <button type="button" class="btn btn-primary">Agregar Taller</button>
                <button type="button" class="btn btn-secondary">Editar Taller</button>
            </div>
        </body>
        </html>  
    `
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
