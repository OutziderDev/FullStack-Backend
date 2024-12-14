const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username : {
    type: String,
    unique:true,
    required:true,
    minLength:3
  },
  name: String,
  passwordHash: {
    type: String,
    required:true
  }
})

userSchema.set('toJSON',{
  transform: (document,objReturned) => {
    objReturned.id = objReturned._id.toString()
    delete objReturned._id
    delete objReturned.__v
    delete objReturned.passwordHash
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User