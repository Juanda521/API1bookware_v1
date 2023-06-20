
const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
const usuariosServices = require('../services/usuariosServices');
const bodyParser = require('body-parser');
const router = express.Router();
const usuario = new usuariosServices();
router.use(bodyParser.json());



//insertOne

router.post('/',async (req,res)=>{
    const body = await req.body;
    const resultado = await usuario.insertOne(body)
    if (resultado){
        res.status(200).json({
            "message":"se ha insertado el usuario",
            data:body,
            resultado,
        });
    }else{
        res.send("no se pudo insertar el usuario ")
        res.send( console.log(body))
    }
})


router.get('/',async (req,res)=>{
    const {limit,offset}  = req.query;
    const resultado = await usuario.find(limit,offset)
    if(resultado){
        res.render('usuarios.ejs',{resultado});
        // res.status(200).send(resultado)
    }else{
        res.status(404).send("no se encontraron resultados")
    }
   
})

router.get('/pruebas',async (req,res)=>{
    const {limit,offset}  = req.query;
    const resultado = await usuario.find(limit,offset)
    if(resultado){
        res.render('usuarios.ejs',{resultado});
        // res.status(200).send(resultado)
    }else{
        res.status(404).send("no se encontraron resultados")
    }
   
})



//findOne

router.get('/:id',async (req,res)=>{
    // const client  = new MongoClient(uri)
    const id = req.params.id;
    console.log(id)
    // await client.connect();
    const resultado = await usuario.findOne(id)
    if(resultado){
        res.status(200).send(resultado)
    }else{
        res.send("no se encontro el usuario con este id")
    }
   
})



router.patch('/:id',async (req,res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri);
    const body = req.body;

    try {
        await client.connect();
        const usuario = await client.db('BookWare').collection('usuarios').updateOne({"_id":new ObjectId(id)},{
            $set:{
                title:body.title,
                year : body.year
            }
        })
        if (usuario){
            res.status(201).json({
                "message":"se ha modificado el usuario",
                data:body,
                usuario
            });
        }else{
            res.send("no se encontro el usuario")
        }
    } catch (error) {
        
    }
})

router.delete('/:id',async (req,res)=>{
   
    const id = req.params;
    // console.log(id);
    const usuarios = await usuario.deleteOne(id);
    if(usuarios){
        res.status(200).json({
            message: 'se ha eliminado al usuario',
            usuarios
        })
        // res.send(usuarios)
    }else{
        res.send("no se encontro el usuario con este id");
    }
})



module.exports = router;