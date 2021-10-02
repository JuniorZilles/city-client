const router = require('express').Router();

const cities = require("./app/controllers/CitiesController")
router.use("/api/v1/cities",cities)

const clients = require("./app/controllers/ClientsController")
router.use("/api/v1/clients",clients)

module.exports = router