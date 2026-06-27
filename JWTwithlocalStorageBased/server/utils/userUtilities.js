const UserModel = require("../models/User.js");
// helper functions
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// ================================================================================

const findUserByEmail = (email) => {
  return UserModel.find((user) => user.email === email) || null;
  // returns a user object

};

const findUserById = (id) => {
  return UserModel.find((user) => user.id === id) || null;
};

const createUser = (email, hashedPassword) => {
  const user = {
    id: generateId(),
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  UserModel.push(user);
  return user;
};

module.exports = { findUserByEmail, findUserById, createUser };
