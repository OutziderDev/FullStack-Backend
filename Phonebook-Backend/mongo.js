const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give pass as argument');
    process.exit(1);
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.w8fap.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

if (process.argv.length == 3) {
    console.log('Phonebook:')
    const i = 0;
    Person.find({}).then(result =>{
        result.forEach( person => {console.log(person.name,' ', person.number)})
        mongoose.connection.close()
    })
} else if (process.argv.length>3) {
    //datos
    const personName = process.argv[3]
    const personNumber = process.argv[4] 
    //console.log('name:',personName, 'number:',personNumber);
    
    const person = new Person({
        name: personName,
        number: personNumber
    })

    person.save().then(result => {
        console.log(`add: ${personName} number: ${personNumber} to phonebook`);
        mongoose.connection.close()  
    })
}

