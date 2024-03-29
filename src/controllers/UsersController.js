const { hash, compare} = require("bcryptjs")
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {

    async create (request, response) {
        const {name, email, password, avatar} = request.body //Faz a requisição pelo Corpo

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)
        await userCreateService.execute({name, email, password, avatar})
        
        response.json()
    }

    async update (request, response) {
        const { name, email, avatar, password, old_password} = request.body
        const id = request.user.id
        
        const user = await knex("users").where({id}).first()

        if(email){
            await knex("users").first().where("email", email).then((checkEmailExists) => {
                if(checkEmailExists && checkEmailExists.id !== user.id) {
                    throw new AppError("Esse E-mail já está em uso")
                }
            })
        }
        

    if(password && !old_password){ //Trata erro caso não informe a senha antiga
            throw new AppError("Você precisa informar a senha antiga")
        } 

     if(password && old_password) { // Usa o "Compare" do bcryptjs para conferir se a senha bate
        const checkOldPassword = await compare(old_password, user.password)

        if(!checkOldPassword){
            throw new AppError("A senha antiga não confere")
        }

         const hashedPassword = await hash(password, 8) 
         console.log(`senha confere, atualizar`)
         await knex("users").update({password:hashedPassword}).where({id})
         response.json()    
    }
 

    await knex("users").update({name, email, avatar}).where({id})

    response.json()           
    } 

    async delete (request, response) {
        const { id } =  request.params

        await knex("users").delete().where({id})

        response.json()
    }
}

module.exports = UsersController