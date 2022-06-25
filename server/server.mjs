import express from 'express'
import { getAllWorkshops } from '../helper.mjs'

const port = 9000
const server = express()

server.get('/', function (req, res) {
    const html = getAllWorkshops()
    res.send(html)
})

server.listen(port, function () {
    console.log(`Server running on ${port}`)
})