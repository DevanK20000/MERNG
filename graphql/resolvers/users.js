const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function genrateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.genral = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bycrypt.compare(password, user.password);
      if (!match) {
        errors.genral = "Wrong creditials";
        throw new UserInputError("Wrong creditials", { errors });
      }

      const token = genrateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate user data

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      // TODO : Make sure user dosent already exists

      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        if (user.email == email) {
          throw new UserInputError("Email is already exists", {
            error: {
              email: "this email already exists",
            },
          });
        }
        if (user.username == username) {
          throw new UserInputError("Username is taken", {
            error: {
              username: "this username is taken",
            },
          });
        }
      }

      // hash passowrd and create an auth token
      password = await bycrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = genrateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
