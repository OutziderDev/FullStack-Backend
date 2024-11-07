const express = require('express');
const app = express();
const PORT = 3001;

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
      number: "83-43-127023"
    }
]
//Funciones y presentacion
app.get('/',(req,res)=>{
  const presentation =`
    <h1>Rest Persons</h1>
    <p>Get information about persons via a RESTful API</p>
    <br> 
    <div>use.. <br>
     <a href="http://localhost:3001/api/persons">/api/persons</a>      for view all persons </br>
     <a href="http://localhost:3001/info">/info</a> to view total persons in phonebook and more info </br>
     <a href="http://localhost:3001/api/persons/4">/api/persons/4</a> to selected 1 people to phonebook </br>
    </div>
    `;
    res.send(presentation);
})

app.get('/info',(req,res)=>{
  const totalpersons = persons.length
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

//API REST
app.get('/api/persons',(req,res)=>{ //Selecciona todo
  res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{//REST for  search only 1 person
  const id = Number(req.params.id)
  const people = persons.find(p => p.id === id)
  people ? res.json(people) : res.status(404).json({Error:'People Mising'}) 
}) 

app.post('/api/persons',(req,res)=>{//REST FOR POST (SEND INFORMATION)
  res.send('Hola')
})

// here update

app.use(express.json());
app.delete(`/api/persons/:id`,(req,res)=>{
  const id = Number(req.params.id);
  persons = persons.filter(people => people.id !== id)
  res.status(204).end()
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} for exit pres CTRL + C` )
})
