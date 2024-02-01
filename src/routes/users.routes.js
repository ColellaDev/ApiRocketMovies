const { Router } = require ("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const multer = require("multer")
const uploadConfig = require("../configs/upload")


const UsersController = require("../controllers/UsersController") // Importando a Classe

const usersController = new UsersController() // Instanciando a Classe

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.delete("/id", usersController.delete)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename)
    response.json()
})

module.exports = usersRoutes

