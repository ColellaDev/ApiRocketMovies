const knex = require("../database/knex")

class UserRepository {
    async findByEmail(email) {

        const user =  await knex("users").first().where("email", email)

         return user
    }

    async create({name, email, password, avatar}) {
        
        const userId = await knex("users").insert({name, email, password, avatar})

        return {id: userId}
    }
}

module.exports = UserRepository