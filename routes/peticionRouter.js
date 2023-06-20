

// const {MongoClient, ObjectId} = require ('mongodb');

const express  = require('express');
const router = express.Router();
const peticionServices = require('../services/peticionServices.js')
const peticion  = new peticionServices();

// var bodyParser = require('body-parser');


// app.use(bodyParser.json());



//obtener peticiones de la base de datos y enviarlas a la vista

router.get('/',async (req,res)=>{
    const {limit,offset}  = req.query;
    try{
        const resultado = await peticion.verPeticiones(limit,offset);
        if(resultado){
            res.render('peticiones.ejs',{resultado});
            // res.send(resultado)
        }else{
            res.send("no se encontro la informacion")
        }
    }catch(e){
        console.log(e);
    }
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    // console.log(id)
    try{
        const resultado = await peticion.buscarPeticion(id);
        res.send(resultado);
      
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

router.delete('/:id',async(req,res)=> {
    const id = req.params.id;
    
    try {
      const resultado  = await peticion.eliminarPeticion(id);
      resultado
      res.status(200).json(
          {
          'mensaje': 'se ha eliminado la peticion exitosamente',
          resultado
          }
      )
  
    } catch (error) {
      console.log(error);
    }
  })

// router.post('/',async (req,res)=>{
//     const client = new MongoClient(uri);
//     const body = req.body;

//     try {
//         await client.connect();
//         const usuario = await client.db('BookWare').collection('peticion').insertOne({body})
//         if (usuario){
//             res.status(201).json({
//                 "message":"se ha insertado la peticion",
//                 data:body,
//                 usuario,
//             });
//         }else{
//             res.send("no se encontro la peticion")
//         }
//     } catch (error) {
        
//     }
// })

// router.patch('/:id',async (req,res)=>{
//     const id = req.params.id;
//     const client = new MongoClient(uri);
//     const body = req.body;

//     try {
//         await client.connect();
//         const usuario = await client.db('BookWare').collection('peticion').updateOne({"_id":new ObjectId(id)},{
//             $set:{
//                 title:body.title,
//                 year : body.year
//             }
//         })
//         if (usuario){
//             res.status(201).json({
//                 "message":"se ha modificado la peticion",
//                 data:body,
//                 usuario
//             });
//         }else{
//             res.send("no se encontro la peticion")
//         }
//     } catch (error) {
        
//     }
// })



module.exports = router;