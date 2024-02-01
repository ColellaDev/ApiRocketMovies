const knex = require("../database/knex")
const AppError = require("../AppError")
const { compare } = require("bcryptjs");


class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex("users").where({ email }).first()
        
        if(!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401) // Verifica se o User existe
        }

        const passwordMatched = await compare(password, user.password); //Compara as senhas

		    if (!passwordMatched) {
			      throw new AppError("E-mail e/ou senha incorreta", 401); //Verifica se a senha bate
		    }

        return response.json({ user })

      }
    }

module.exports = SessionsController