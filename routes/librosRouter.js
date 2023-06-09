
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
        const libros = await client.db('BookWare').collection('Libros').find({}).limit(5).toArray();
        if(libros){
            res.send(libros)
        }else{
            res.send("no se encontraron los libros")
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
        const libros = await client.db('BookWare').collection('Libros').findOne({idLibro:id});
        if(libros){
            res.send(libros)
        }else{
            res.send("no se encontro el libro con este id")
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
        const libros = await client.db('BookWare').collection('Libros').insertOne({body})
        if (libros){
            res.status(201).json({
                "message":"se creo un libro",
                data:body,
                libros,
            });
        }else{
            res.send("no se encontro el libro")
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
        const Libro = await client.db('BookWare').collection('Libros').updateOne({"_id":new ObjectId(id)},{
            $set:{
                title:body.title,
                year : body.year
            }
        })
        if (Libro){
            res.status(201).json({
                "message":"se modifico el libro",
                data:body
            });
        }else{
            res.send("no se encontro el libro")
        }
    } catch (error) {
        
    }
})

module.exports = router;