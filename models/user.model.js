const configuration = require("../configs/configuration");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Duplicate username"],
    },
    password: String,
    role: String,
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, configuration.SALT_ROUNDS);
  }
  next();
});

module.exports= mongoose.model("User1", userSchema, "Users");