
require ('dotenv').config();
const express = require ('express');
const bodyparser  = require('body-parser');
const morgan = require('morgan');
//cabecera de la peticion (para recibir mas detallado los elementos de la peticion)
const helmet = require('helmet');

const cors = require('cors');
const path  = require ('path');
// const { fileURLToPath } = require('url');
const routerApi = require('./routes/indexRouter.js');
const port = process.env.PORT || 3000;
const app = express();

routerApi(app)

//settings
app.set('views',path.join(__dirname,'views')); //donde buscar las vistas
app.set('view.engine','ejs'); //motor para las plantillas EJS

app.use(express.static('public'));
app.use(bodyparser.json());//para poder trabjar con json (entradas)
app.use(bodyparser.urlencoded({extended:true})); //para poder trabajar con formularios codificados en url
app.use(express.json());//para poder devolver con expres documentos json (puerto de salida)
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
// app.use(express.static('public'));

// app.get('/',(req,res)=>{
//     res.send('API de usuarios');
// })

app.get('/',(req,res)=>{
    const filePath  =(path.join(__dirname,'public','html','index.html'));
    res.sendFile(filePath)
})



// app.get('/hola',(req,res)=>{
//     res.send('prueba de cambio');
// })

app.get('/*',(req,res)=>{
    res.status(404).send('Opps! la informacion que solicitaste no esta disponible 🥺🥺🥺')
})



app.listen(port,()=>{
    console.log(`el servidor se esta escuchando en : http://localhost:${port}`);
})

