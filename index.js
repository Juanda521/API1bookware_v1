const express = require ('express');
//const {MongoClient, ObjectId} = require ('mongodb');
const bodyparser  = require('body-parser');
require ('dotenv').config();

const routerApi = require('./routes/indexRouter.js');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const port = process.env.PORT || 3000;
const app = express();

routerApi(app)


app.use(bodyparser.json());//para poder trabjar con json (entradas)
app.use(bodyparser.urlencoded({extended:true})); //para poder trabajar con formularios codificados en url
app.use(express.json());//para poder devolver con expres documentos json (puerto de salida)
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('API de usuarios');
})

app.get('/hola',(req,res)=>{
    res.send('prueba de cambio');
})

app.get('/*',(req,res)=>{
    res.status(404).send('Opps! la informacion que solicitaste no esta disponible 🥺🥺🥺')

})



app.listen(port,()=>{
    console.log(`el servidor se esta escuchando en : http://localhost:${port}`);
})
