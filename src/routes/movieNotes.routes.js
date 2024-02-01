const { Router } =  require("express") // Importa o Router do Express
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const MovieNotesController = require("../controllers/MovieNotesController") // Importa a Classe

const movieNotesController = new MovieNotesController() // Instancia a classe

const movieNotesRoutes = Router()

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.get("/", movieNotesController.index)
movieNotesRoutes.post("/", movieNotesController.create)
movieNotesRoutes.delete("/:id", movieNotesController.delete)
movieNotesRoutes.get("/:id", movieNotesController.show)

module.exports = movieNotesRoutes

