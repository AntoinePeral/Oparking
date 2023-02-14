require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();

// On précise que notre app va recevoir du JSON
app.use(express.json());

// Préciser qu'on va accepter les requêtes d'autres domaines que celui de notre API
app.use(cors());

// Exécuter la liaison/associations entre les models
require('./app/models/models')

const carsRouter = require('./app/routers/carRouter');
const personRouter = require ('./app/routers/personRouter')

app.use('/cars', carsRouter);
app.use('/persons', personRouter)

// MW 404
app.use ((req,res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Not Found"
  })
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('vous êtes connecté sur http://localhost:'+PORT);
})
