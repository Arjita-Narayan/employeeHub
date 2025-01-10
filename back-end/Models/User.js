const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//writing our middleware
UserSchema.pre("save", async function (next) {
  try {
    //console.log("called before saving the user thats why it is named .pre");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    console.log(this.username, this.email, this.password);
    next();
  } catch (error) {
    next(error);
  }
});

//checking the entered password with password stored in database for login route
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);//using return keyword as it returns boolean value
  } catch (error) {
    throw error;//this is not middleware so we can directly throw error
  }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
