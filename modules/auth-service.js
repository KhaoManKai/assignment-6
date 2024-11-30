const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

let User; 

const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    unique: true 
  },
  password: String,
  email: String,
  loginHistory: [{
    dateTime: Date,
    userAgent: String
  }]
});

function initialize() {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(process.env.MONGODB);
    
    db.on('error', (err) => {
      reject(err);
    });
    
    db.once('open', () => {
      User = db.model("users", userSchema);
      resolve();
    });
  });
}

function registerUser(userData) {
  return new Promise(async (resolve, reject) => {
    if (userData.password !== userData.password2) {
      reject("Passwords do not match");
    } else {
      try {
        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        
        let newUser = new User(userData);
        await newUser.save();
        resolve();
      } catch (err) {
        if (err.code === 11000) {
          reject("User Name already taken");
        } else {
          reject(`There was an error creating the user: ${err}`);
        }
      }
    }
  });
}

function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({ userName: userData.userName });
      
      if (users.length === 0) {
        reject(`Unable to find user: ${userData.userName}`);
        return;
      }

      const isPasswordMatch = await bcrypt.compare(userData.password, users[0].password);
      
      if (!isPasswordMatch) {
        reject(`Incorrect Password for user: ${userData.userName}`);
        return;
      }

      if (users[0].loginHistory.length === 8) {
        users[0].loginHistory.pop();
      }
      
      users[0].loginHistory.unshift({
        dateTime: new Date().toString(),
        userAgent: userData.userAgent
      });

      await User.updateOne(
        { userName: users[0].userName },
        { $set: { loginHistory: users[0].loginHistory } }
      );
      
      resolve(users[0]);
    } catch (err) {
      reject(`Unable to find user: ${userData.userName}`);
    }
  });
}

module.exports = {
  initialize,
  registerUser,
  checkUser
};