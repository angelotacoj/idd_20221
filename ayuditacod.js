export async function updateNewMark(grade,cod_student,cod_section){
    const updateMark = await runUpdate(`
    UPDATE NOTA 
    SET VALOR = '${grade}'
    WHERE COD_ALUMNO = '${cod_student}' AND COD_SECCION='${cod_section}'
    `)
    console.log('updateMark =', updateMark)
}

//------------------------------------

export async function getAllMarksBySection(){
    const marksBySection = await runSelect(
        `SELECT U.DNI, U.NOMBRES_NOMBRE, U.APELLIDOP_NOMBRE, U.APELLIDOM_NOMBRE,S.NOMBRE_SECCION, S.COD_SECCION ,N.VALOR AS NOTA
        FROM USUARIO U
        INNER JOIN ALUMNO A 
        ON U.DNI = A.COD_ALUMNO
        INNER JOIN MATRICULA M
        ON M.COD_ALUMNO = A.COD_ALUMNO
        INNER JOIN SECCION S 
        ON M.COD_SECCION = S.COD_SECCION
        INNER JOIN NOTA N 
        ON S.COD_SECCION = N.COD_SECCION AND A.COD_ALUMNO = N.COD_ALUMNO
        WHERE S.NOMBRE_SECCION='ROJO'
        `
    )
    const headers = marksBySection.metaData
    const rows = marksBySection.rows

    let htmlHead = ''
    for (const header of headers){
        const nameHTML = '<th scope="col">' + header.name + '</th>'
        htmlHead = htmlHead + nameHTML
        //console.log(nameHTML)
    }
    let htmlRowWS = ''

    for (const row of rows){  
        let htmlRow = ''
        const grade = row.splice(-1)
        const cod_student = row[0]
        const cod_section = row[5]
        console.log(row)
        for(const elem of row){
            const td_html = `<td>`+ elem +`</td>`
            htmlRow = htmlRow + td_html 

        }
        const td_html_input = `
            <td>
                <form method="post" action="/ingresar_notas">
                    <input name="grade" type="text" value="${grade[0]}">
                    <input name="cod_student" type="hidden" value="${cod_student}">
                    <input name="cod_section" type="hidden" value="${cod_section}">
                </form>
            </td>`
        const tr_html = `<tr>`+ htmlRow + td_html_input+`</tr>`
        htmlRowWS = htmlRowWS + tr_html
    }