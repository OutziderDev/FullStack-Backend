const express = require('express');
const app = express();
require('dotenv').config();

const Person = require('./models/person')

app.use(express.static('dist'));

const errorHandler = (error,request,response,next) => {
  //console.log(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({error:'malformatted id'})
  }else if(error.name === 'ValidationError'){
    return response.status(400).send({error:error.message})
  }
  next(error)
}

const cors = require('cors');
app.use(cors())
app.use(express.json());

const morgan = require('morgan');
morgan.token('body', (req) => {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms, :body'));

//Funciones y presentacion
app.get('/api',(req,res) => {
  const presentation =`
    <h1>Rest Persons</h1>
    <p>Get information about persons via a RESTful API</p>
    <br> 
    <div>use.. <br>
     <a href="https://phonebook-mpsk.onrender.com/api/persons">/api/persons</a>      for view all persons </br>
     <a href="https://phonebook-mpsk.onrender.com/info">/info</a> to view total persons in phonebook and more info </br>
     <a href="https://phonebook-mpsk.onrender.com/api/persons/4">/api/persons/4</a> to selected 1 people to phonebook </br>
    </div>
    `;
    res.send(presentation);
})

app.get('/info',(req,res) => {// Information of total people and date
  Person.find({}).then(resp => {
    const  totalpersons  =  resp.length
    const currentDate = new Date;
    const information = `
    <div>
      <p>Phonebook has info for ${totalpersons} people</p>
      <p>${currentDate}</p>

      <br><br><br>
      <a href="/" > ← Back </a>
    </div>
    `;
    res.send(information)
  })
})

//API REST
app.get('/api/persons',(req,res) => { //Selecciona todo
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.post('/api/persons',(req,res,next) => {//REST FOR POST (SEND INFORMATION)
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({Error:'Fatal error: number or name is missing'})
  }

  const people = new Person({
    name:body.name,
    number:body.number
  })

  people.save().then(resp => {
    res.status(201).json(resp)
  })
  .catch(error => {next(error) })
})

app.get('/api/persons/:id',(req,res,next) => {//REST for  search only 1 person
  Person.findById(req.params.id)
  .then(resp => {
    if (resp) {
      res.json(resp)
    }else{
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete(`/api/persons/:id`,(req,res,next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(() => {res.status(204).end();})
  .catch(error => next(error))
})

app.put('/api/persons/:id',(req,res,next) => {
  const data = req.body
  const updatePeople = {
     name: data.name,
     number: data.number
  }
  Person.findByIdAndUpdate(req.params.id,updatePeople,{new:true,runValidators:true})
  .then(result => {res.json(result)})
  .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT} for exit pres CTRL + C`
  )})
