const mongoose= require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique : true
    },
    Password: {
        type: String,
        required: true
    }
  });
  const User= mongoose.model('user', UserSchema);
  User.createIndexes();
  module.exports= User;