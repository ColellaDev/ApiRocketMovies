const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreateService {
     constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, email, password, avatar}){
    
        if(!name){
            throw new AppError("Nome é obrigatório!")
        }
        
        const checkEmailExists = await this.userRepository.findByEmail(email)

            if(checkEmailExists) {
                throw new AppError("Este e-mail já está em uso.")
            }
        
        const hashedPassword = await hash(password, 8)

        const userCreated = await this.userRepository.create({name, email, password:hashedPassword, avatar})

        return userCreated
    }
}

module.exports = UserCreateService 