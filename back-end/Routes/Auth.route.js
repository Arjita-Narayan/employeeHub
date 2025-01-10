const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User");
const { authSchema } = require("../Helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../Helpers/jwt_helper");
const { authSchemaLogin } = require("../Helpers/validation_schema");

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await authSchema.validateAsync(req.body);
    //console.log(result);

    const { username, email } = result;

    // Check if a user with the same username already exists
    const userByUsername = await User.findOne({ username: result.username });
    if (userByUsername) {
      throw createError(409, `${username} is already registered`);
    }

    // Check if a user with the same email already exists
    const userByEmail = await User.findOne({ email: result.email });
    if (userByEmail) {
      throw createError(409, `${email} is already registered`);
    }

    const user = new User(result);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchemaLogin.validateAsync(req.body);
    //checking whether the user is registered or not
    const user = await User.findOne({ username: result.username });
    if (!user) throw createError.NotFound("User not registered");

    //checking the entered password with password stored in database
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Username/Password not valid");
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
   // res.send(result);
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

router.post("/refresh-token", async (req, res, next) => {
  // res.send("refresh token route");
  try {
    //extracting refresh token
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
