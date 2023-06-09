
const express  =require('express');

const librosRouter = require('./librosRouter.js');

const usuariosRouter = require('./usuariosRouter.js');

const peticionRouter  = require('./peticionRouter.js');

const prestamoRouter = require('./prestamoRouter.js');


function routerApi(app){

    const router = express.Router();
    app.use('/api/v1',router)
    router.use('/usuarios',usuariosRouter);
    router.use('/libros',librosRouter);
    router.use('/peticion',peticionRouter);
    router.use('/prestamo',prestamoRouter);

}

module.exports = routerApi;