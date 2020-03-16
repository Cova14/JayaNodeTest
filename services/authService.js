const { UserRepository } = require('../repositories')
const { repoValidator } = require('../validators')

const {
  returnServiceSchema,
  hashPassword,
  JWTsign,
  checkJWTToken,
  checkPassword
} = require('../utils')

class AuthService {

  constructor() {}

  static async register(userData) {
    try {
      const user = await UserRepository.getUserByEmail(userData.email)
      
      if (repoValidator(user)) {
        return returnServiceSchema(
          { message: "The email is already in use" },
          true)
      } else {
        const hashedPassword = await hashPassword(userData.password)
        userData.password = hashedPassword
        const newUserId = await UserRepository.create(userData)
        if (!!newUserId) {
          const userCreated = await UserRepository.getUserByEmail(userData.email)
          if (!!userCreated) {
            const payload = {
              id: newUserId,
              username: userData.email
            }
            const token = await JWTsign(payload)
            if (!!token) {
              return returnServiceSchema({
                message: "User created succesfully",
                token,
                user: userCreated
              })
            } else {
              return returnServiceSchema(
                { message: "Something wrong happened trying to login" },
                true
              )
            }
          } else {
            return returnServiceSchema(
              { message: "User not found" },
              true
            )
          }
        } else {
          return returnServiceSchema(
            { message: "Couln't create user" },
            true
          )
        }
      }
    } catch (error) {
      return returnServiceSchema(error, true)
    }
  }

  static async login(loginSchema) {
    console.log(loginSchema)
    const isValid = await !!loginSchema.token ? checkJWTToken(loginSchema.token) : false
    if (!!isValid) {
      return returnServiceSchema(
        { message: 'User already logged in' },
        true
      )
    }
    const { email, password } = loginSchema
    try {
      const user = await UserRepository.getUserWithPassword(email)
      const userWoPassword = await UserRepository.getUserByEmail(email)
      if (!repoValidator(user)) {
        return returnServiceSchema(
          { message: "Email doesn't exist" },
          true
        )
      }
      if (await checkPassword(password, user.password)) {
        const payload = {
          id: user.id,
          username: user.email
        }
        const token = await JWTsign(payload)
        if (token) {
          return returnServiceSchema({
            message: 'Ok',
            token,
            user: userWoPassword
          })
        } else {
          return returnServiceSchema(
            { message: "Unable to login" },
            true
          )
        }
      } else {
        return returnServiceSchema(
          { message: "Incorrect credentials" },
          true
        )
      }
    } catch (error) {
      console.log("Error Auth Service - Login", error)
      return returnServiceSchema(error, true)
    }
  }

  static getAll() {
    return UserRepository.getAll();
  };
}

module.exports = AuthService