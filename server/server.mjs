import express from 'express'
import { getAllWorkshops } from '../helper.mjs'

const port = 9000
const server = express()

server.use(express.static('public'))

server.get('/talleres', async function (req, res) {
    const html = await getAllWorkshops()
    // const html = '<h1>Talleres</h1>'
    res.send(html)
})

server.listen(port, function () {
    console.log(`Server running on ${port}`)
})