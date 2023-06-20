const express = require ('express');
const {MongoClient, ObjectId} = require ('mongodb');
require ('dotenv').config();


const uri = process.env.URI

class usuarioService{

    constructor(){

    }

    //INSERT

    //insertOne

    async insertOne(body){
        console.log(body);

        const client = new MongoClient(uri)
        try {
            await client.connect();
            const usuario = await client.db('BookWare').collection('usuarioss').insertOne(body)
            console.log(usuario);
            return (usuario)  ? usuario : 'error' ;
        } catch(e){
            console.log(e);
        }
    }

    //insertMany

    //FIND

    //find

    async find(limit,offset){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const usuarios = await client.db('BookWare').collection('usuarioss').find({}).skip(Number(offset)).limit(Number(limit)).toArray();
            return usuarios;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


    //findOne
    async findOne(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const usuarios = await client.db('BookWare').collection('usuarioss').findOne({'idUsuario':Number(id)});
            return usuarios;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


   
    //update
    
    //DELETE

    //deleteOne


    async  deleteOne(id){
            const client  = new MongoClient(uri);
        try{
            await client.connect();
            //ya que id nos llega como objeto, hacemos esto para obtener el valor del atributo id
            const valorId = id.id;
         
            const usuarios = await client.db('BookWare').collection('usuarioss').deleteOne({idUsuario:Number(valorId)});
            return usuarios;
        }catch(e){
            console.log(e);
        }
    }

    //deleteMany
    
}

module.exports  = usuarioService;