const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(result =>{
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('error connecting to MongoDB',error);
        
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required:true
    },
    number: {
        type: String,
        required:true,
        validate:{
            validator: function (v){
                return /^0\d{1,2}-\d{6,8}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number format! Use 09-1234556 or 040-22334455.`,
        }
    }
})

personSchema.set('toJSON',{
    transform: (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)