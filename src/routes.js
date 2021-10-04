const router = require('express').Router();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./static/swagger_layout.json')

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const cities = require("./app/controllers/CitiesController")
router.use("/api/v1/cities",cities)

const clients = require("./app/controllers/ClientsController")
router.use("/api/v1/clients",clients)

module.exports = router