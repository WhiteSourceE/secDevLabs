const User = require('./models/user');
var sanitize = require('mongo-sanitize');

const register = async (user) => {
  try {
    const { name, email, password } = user;
    const s_name = sanitize(name);
    const s_email = sanitize(email);
    const s_password = sanitize(password);

    const existUser = await User.findOne({ email: s_email });

    if (existUser) {
      return null;
    }

    const newUser = new User({
      name: s_name,
      email: s_email,
      password: s_password,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const s_email = sanitize(email);
    const s_password = sanitize(password);

    const existsUser = await User.find({
      $and: [{ email: s_email }, { password: s_password }],
    });

    if (!existsUser) {
      return null;
    }

    const returnUser = existsUser.map((user) => {
      return user.email;
    });

    return returnUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
};
