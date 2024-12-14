const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username : {
    type: String,
    unique:true,
    required:true
  },
  name: String,
  passwordHash: String
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