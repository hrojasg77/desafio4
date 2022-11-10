const express = require('express')
const routerApi = express.Router()
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

let cosas = []
let id = 0

function controllerDevTodo(req,res){
    if(cosas.length === 0) {
        res.status(404)
        res.json({ mensaje:`No hay productos`} )
    }
    else {
        res.json(cosas)
    }
}

function controllerAgregaYDevId(req,res){
    let nombre = req.body.nombreproducto
    let precio = req.body.precio
    let imagen = req.body.imagenproducto
    
    id++
    let objeto = {}  
    objeto['id'] = id 
    objeto['title'] = nombre
    objeto['price'] = precio
    objeto['thumbnail'] = imagen

    cosas.push(objeto)
    res.status(201)        
    res.json({mensaje:`numero: ${id}`})
}

function controllerDevPorId(query,res){
   const result = cosas.find(cosas => cosas.id === parseInt(query.params.id));  
   if (result) {
    res.json(result)
   } else {
    res.status(404)
    res.json({ error:`Producto ID=${query.params.id} no encontrado`} )
   }   
}

function controllerRecibeYActPorId(req,res){
    const indice = cosas.findIndex(cosas => cosas.id === parseInt(req.params.id));
    if (indice != -1) {
        let nombreact = req.body.title
        let precioact = req.body.price
        let imagenact = req.body.thumbnail

        cosas[indice].title     = nombreact
        cosas[indice].price     = precioact
        cosas[indice].thumbnail = imagenact

        res.status(200)        
        res.json({ mensaje:`Producto ID=${req.params.id} actualizado existosamente`} )               
    }
    else
    {
        res.status(404)
        res.json({ error:`Producto ID=${req.params.id} no encontrado, no es posible actualizar`} )
    }
}

function controllerEliminaPorId(query,res){
    const indice = cosas.findIndex(cosas => cosas.id === parseInt(query.params.id));
    if (indice != -1) {
       cosas.splice(indice,1)
       res.status(200)       
       res.json({ mensaje:`Producto ID=${query.params.id} eliminado existosamente`} )       
    }
    else
    {
        res.status(404)
        res.json({ error:`Producto ID=${query.params.id} no encontrado, no es posible eliminar`} )
    }
}

module.exports = {controllerDevTodo,controllerAgregaYDevId,controllerDevPorId,controllerRecibeYActPorId,controllerEliminaPorId}