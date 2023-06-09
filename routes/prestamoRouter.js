
const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
const bodyparser  = require('body-parser');
require ('dotenv').config();

const uri = "mongodb+srv://juanda52141:juanda52141@cluster0.hlnd5vi.mongodb.net/?retryWrites=true&w=majority"

//const port = 3000;

//const app = express();

const router = express.Router();



router.get('/',async (req,res)=>{
    const client  = new MongoClient(uri)
    try{
        await client.connect();
        const prestamo = await client.db('BookWare').collection('prestamo').find({}).limit(5).toArray();
        if(prestamo){
            res.send(prestamo)
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
        const prestamo = await client.db('BookWare').collection('prestamo').findOne({idprestamo:id});
        if(prestamo){
            res.send(prestamo)
        }else{
            res.send("no se encontro el prestamo con este id")
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
        const prestamo = await client.db('BookWare').collection('prestamo').insertOne({body})
        if (prestamo){
            res.status(201).json({
                "message":"se ha insertado el prestamo",
                data:body,
                prestamo,
            });
        }else{
            res.send("no se encontro la pelicula")
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
        const prestamo = await client.db('BookWare').collection('prestamo').updateOne({"_id":new ObjectId(id)},{
            $set:{
                title:body.title,
                year : body.year
            }
        })
        if (prestamo){
            res.status(201).json({
                "message":"se ha modificado el prestamo",
                data:body,
                prestamo
            });
        }else{
            res.send("no se encontro el prestamo")
        }
    } catch (error) {
        
    }
})

module.exports = router;