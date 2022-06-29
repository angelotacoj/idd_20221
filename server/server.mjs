import express from 'express'
import { getAllWorkshops } from '../helper.mjs'
import { createNewWorkshop } from '../helper.mjs'
import { getAllMarksBySection } from '../helper.mjs'
import { getAllSectionsByTeacher } from '../helper.mjs'


const port = 9000
const server = express()

server.use(express.static('public'))

server.get('/talleres', async function (req, res) {
    const html = await getAllWorkshops()
    // const html = '<h1>Talleres</h1>'
    res.send(html)
})

server.get('/anadir_talleres', async function (req, res) {
    const html = await createNewWorkshop()
    // const html = '<h1>Talleres</h1>'
    res.send(html)
})

server.get('/ingresar_notas', async function(req, res){
    const html = await getAllMarksBySection()
    res.send(html)
})

server.get('/seccion', async function(req, res){
    const html = await getAllSectionsByTeacher()
    res.send(html)
})

server.listen(port, function () {
    console.log(`Server running on ${port}`)
})