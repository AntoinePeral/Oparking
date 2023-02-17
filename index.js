require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const multer = require('multer')
const bodyParser = multer()

// on utlise .none() pour dire qu'on attends pas de fichiers, uniquement des inputs "classiques"
app.use(bodyParser.none() );

// On précise que notre app va recevoir du JSON
app.use(express.json());

// Préciser qu'on va accepter les requêtes d'autres domaines que celui de notre API
app.use(cors());

// Exécuter la liaison/associations entre les models
require('./app/models/models')

const carsRouter = require('./app/routers/carRouter');
const personsRouter = require ('./app/routers/personRouter')
const router = require('./app/routers/router');

app.use(express.static(('assets')));
// /var/www/html/Ohm/S07/S07-E05-oParking-AntoinePeral/assets'
app.use(router)
app.use('/cars', carsRouter);
app.use('/persons', personsRouter)

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
