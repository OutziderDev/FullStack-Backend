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
    }
]
//Funciones y presentaciones
app.get('/',(req,res)=>{
  res.send(`
    <h1>Rest Persons</h1>
    <p>Get information about persons via a RESTful API</p>
    <br> 
    <div> use.. <br>
     <a href="http://localhost:3001/api/persons">/api/persons</a>      for view all persons <br>
    </div>
    `);
})

app.get('/api/persons',(req,res)=>{
  res.json(persons)
})


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} for exit pres CTRL + C` );
})
