const { Router } =  require("express") // Importa o Router do Express
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const MovieTagsController = require("../controllers/MovieTagsController") // Importa a Classe

const movieTagsController = new MovieTagsController() // Instancia a classe

const movieTagsRoutes = Router()

movieTagsRoutes.get("/", ensureAuthenticated, movieTagsController.index)


module.exports = movieTagsRoutes