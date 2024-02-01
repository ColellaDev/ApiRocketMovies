const { Router } = require ("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const UsersController = require("../controllers/UsersController") // Importando a Classe

const usersController = new UsersController() // Instanciando a Classe

const usersRoutes = Router()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.delete("/id", usersController.delete)

module.exports = usersRoutes

