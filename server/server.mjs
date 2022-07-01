import express from 'express'
import bodyParser from 'body-parser'
import { getAllWorkshops } from '../helper.mjs'
import { showCreateNewWorkshop } from '../helper.mjs'
import { getAllMarksBySection } from '../helper.mjs'
import { createNewWorkshop } from '../helper.mjs'
import { getAllSectionsByTeacher } from '../helper.mjs'
import { updateNewMark } from '../helper.mjs'


const port = 9000
const server = express()


server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static('public'))

server.get('/talleres', async function (req, res) {
    const html = await getAllWorkshops()
    res.send(html)
})

server.get('/anadir_talleres', async function (req, res) {
    const html = await showCreateNewWorkshop()
    res.send(html)
})

server.post('/anadir_talleres', async function (req,res){
    await createNewWorkshop(req.body.cod_taller,req.body.timestart,req.body.timefinal,req.body.date,req.body.ws_name,req.body.ws_des,req.body.cod_teacher)
    //console.log("Estoy aca: ",req.body)
    res.redirect('/talleres')
})

server.get('/ingresar_notas', async function(req, res){
    const html = await getAllMarksBySection()
    res.send(html)
})

server.get('/seccion', async function(req, res){
    const html = await getAllSectionsByTeacher()
    res.send(html)
})

server.post('/ingresar_notas', async function(req,res){
    await updateNewMark(req.body.grade,req.body.cod_student,req.body.cod_section,req.body.name_course)
    //console.log(req.body)
    res.redirect('/ingresar_notas')
})

server.listen(port, function () {
    console.log(`Server running on ${port}`)
})