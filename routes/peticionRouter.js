
const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
const bodyparser  = require('body-parser');
require ('dotenv').config();

const uri = "mongodb+srv://juanda52141:juanda52141@cluster0.hlnd5vi.mongodb.net/?retryWrites=true&w=majority"

const router = express.Router();



router.get('/',async (req,res)=>{
    const client  = new MongoClient(uri)
    try{
        await client.connect();
        const peticion = await client.db('BookWare').collection('peticion').find({}).limit(5).toArray();
        if(peticion){
            res.send(peticion)
        }else{
            res.send("no se encontro la informacion")
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

router.get('/:id',async (req,res)=>{
    const client  = new MongoClient(uri)
    const {id} = req.params;
    console.log(id)
    try{
        await client.connect();
        const peticion = await client.db('BookWare').collection('peticion').findOne({idusuario:id});
        if(peticion){
            res.send(peticion)
        }else{
            res.send("no se encontro la peticion con este id")
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

router.post('/',async (req,res)=>{
    const client = new MongoClient(uri);
    const body = req.body;

    try {
        await client.connect();
        const usuario = await client.db('BookWare').collection('peticion').insertOne({body})
        if (usuario){
            res.status(201).json({
                "message":"se ha insertado la peticion",
                data:body,
                usuario,
            });
        }else{
            res.send("no se encontro la peticion")
        }
    } catch (error) {
        
    }
})

router.put('/:id',async (req,res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri);
    const body = req.body;

    try {
        await client.connect();
        const usuario = await client.db('BookWare').collection('peticion').updateOne({"_id":new ObjectId(id)},{
            $set:{
                title:body.title,
                year : body.year
            }
        })
        if (usuario){
            res.status(201).json({
                "message":"se ha modificado la peticion",
                data:body,
                usuario
            });
        }else{
            res.send("no se encontro la peticion")
        }
    } catch (error) {
        
    }
})

module.exports = router;