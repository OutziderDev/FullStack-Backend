const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());

const persons = [
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
      id: 4,
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
app.get('/api/persons',(req,res)=>{
  res.json(persons)
})

app.post('/api/persons',(req,res)=>{
  res.send('Hola')
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} for exit pres CTRL + C` );
})
