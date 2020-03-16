const { AuthService } = require('../services');

const {
  serviceValidator,
  loginSchemaValidator
} = require('../validators');

class AuthController {
  static async registerUser(req, res) {
    const userSchema = req.body;
    const validatorResult = createUserSchemaValidator(userSchema)
    if (validatorResult.error) {
      return res.status(400).json({
        message: Errors.InvalidRequestBody,
        errors: validatorResult.errors
      })
    }
    const newUser = await AuthService.register(userSchema);
    if (!serviceValidator(newUser)) {
      return res.status(400).json(newUser.response);
    }
    return res.status(201).json(newUser.response);
  }

  static async login(req, res) {
    const loginSchema = req.body;

    const validatorResult = loginSchemaValidator(loginSchema);
    if(validatorResult.error) {
      return res.status(400).json({
        message: "Invalid body",
        errors: validatorResult.errors
      });
    }

    const loginResult = await AuthService.login(loginSchema);
    if (!serviceValidator(loginResult)) {
      return res.status(400).json(loginResult.response);
    }
    return res.status(200).json(loginResult.response);
  }

  static async getUsers(req, res) {
    try {
      const users = await AuthService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    };
  };
}

module.exports = AuthController