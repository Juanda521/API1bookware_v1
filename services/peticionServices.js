const {MongoClient}  = require ('mongodb');

require ('dotenv').config();

class peticionServices{

    constructor(){
        this.uri = process.env.URI;
        this.conexion  = new MongoClient(this.uri);
    }

    async verPeticiones(limit,offset) {
        // console.log(limit,offset)
    
        const skip = (offset === null || offset === undefined) ? 0 : offset;

        await this.conexion.connect();
        try {
            const peticiones = await this.conexion.db('BookWare').collection('peticiones').aggregate(
                [
                    {
                        $limit:Number(limit)
                    },
                    {
                        $skip:Number(skip)
                    }
                ]
            ).toArray();
            return (peticiones)  ? peticiones : message  ='hubo un error al mostrar los registros';    
        } catch (error) {
            console.log(error);
        }
    }

    async buscarPeticion(id){
        await this.conexion.connect();
        try {
            const peticion = await this.conexion.db('BookWare').collection('peticiones').aggregate([{
                $match: {
                  $or:[{idPeticion:Number(id)},{idUsuario:Number(id)},{idLibro:Number(id)}]
                }
            }]).toArray();
            return (peticion)  ? peticion : message = 'no se encontraron resultados con este id'

        } catch (e) {
            console.log(e)
        }
    }

    async eliminarPeticion(id){
        await this.conexion.connect();
        try {
            const peticion = await this.conexion.db('BookWare').collection('peticiones').deleteOne({idUsuario:Number(id)})
            return (peticion)? peticion  : message = 'no se encontro el id de la peticion que deseas eliminar';
        } catch (error) {
            console.log(error)
        }
    }

  

}

module.exports  = peticionServices;