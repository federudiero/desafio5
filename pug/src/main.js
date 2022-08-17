const express = require('express')

const ProductosApi = require('../api/productos.js')

const productosApi = new ProductosApi()

let hayProductos = false

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Set engine

app.set('views', './views')
app.set('view engine', 'pug');

//--------------------------------------------

 app.post('/productos', (req, res) => {
     productosApi.save(req.body);
     res.redirect('/');
 })

 app.get('/productos', (req, res) => {
     const productos = productosApi.listAll()
     hayProductos = productos.length > 0 ? true : false;
     res.render('vista', {productos, hayProductos});
 });

//--------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
