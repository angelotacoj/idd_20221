const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

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

async function getAllWorkshops() {
    const result = await runSelect('SELECT * FROM TALLER')
    console.log('workshops =', workshops)
}

getAllWorkshops()