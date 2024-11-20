require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT 
const cors = require('cors');
const Person = require('./models/person')
app.use(cors())
app.use(express.json());
app.use(express.static('dist'));
const morgan = require('morgan');
morgan.token('body', (req,res)=>{return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms, :body'));

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    },
    { 
      id: 5,
      name: "Mary Cuie", 
      number: "83-43-127093"
    }
]
//Funciones y presentacion
app.get('/api',(req,res)=>{
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

app.get('/info',(req,res)=>{// Information of total people and date
  Person.find({}).then(resp=> { 
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
app.get('/api/persons',(req,res)=>{ //Selecciona todo
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id',(req,res)=>{//REST for  search only 1 person
  const id = Number(req.params.id)
  const people = persons.find(p => p.id === id)
  people ? res.json(people) : res.status(404).json({Error:'People Mising'}) 
}) 

app.post('/api/persons',(req,res)=>{//REST FOR POST (SEND INFORMATION)
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(404).json({Error:'Fatal error: number or name is missing'})
  }

  const people = new Person({
    name:body.name,
    number:body.number
  })

  people.save().then(resp => {
    res.status(201).json(resp)
  })
})

// here update

app.delete(`/api/persons/:id`,(req,res)=>{
  const id = Number(req.params.id);
  persons = persons.filter(people => people.id !== id);
  res.status(204).end();
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} for exit pres CTRL + C` )
})
