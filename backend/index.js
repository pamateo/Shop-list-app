const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
require('dotenv').config();

const {dbConnection}=require('./database/db');

const app= express();
dbConnection();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use('/api/tareas', require('./routes/tareas.routes'));
app.use('/api/historial', require('./routes/historial.routes'));


app.listen(process.env.PORT, ()=>{
    console.log('Servidor :'+process.env.PORT);
});