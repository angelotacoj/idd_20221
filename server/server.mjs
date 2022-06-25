import express from 'express'

const port = 9000
const server = express()

server.get('/', function (req, res) {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                h1{
                    color: red;
                }
            </style>
        </head>
        <body>
            <h1>Hola</h1>
        </body>
        </html>
    `
    res.send(html)
})

server.listen(port, function () {
    console.log(`Server running on ${port}`)
})