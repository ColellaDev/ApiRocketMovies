require("express-async-errors")
require("dotenv/config")

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const express = require("express"); //Importa o Express
const database = require("./database/sqlite/index") // importando o Sqlite
const cors = require("cors")

const app = express(); //Cria a aplicação Express
app.use(cors())
app.use(express.json()) //Define o Json como padrão para o Express

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

database()

const routes = require("./routes/index")

app.use(routes)

app.use((error, request, response, next)=> {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))

