const express = require('express')

const app = express()

app.use(express.json())

let today = new Date();

let  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`There are ${persons.length} in the phone book: ${date}`)
  // console.log(persons.length,date)
  // response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personsEntry = persons.find(persons => persons.id === id)

  if (personsEntry) {
    response.json(personsEntry)
  } else {
    response.status(404).send() 
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(persons => persons.id !== id)

  response.status(204).end()
})
//________________________________________________
const generateId = () => {
  const maxId = persons.length > 0
    ?  Math.floor(Math.random() * (10000 - 4 + 1)) + 4
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {

  const body = request.body

  // if(persons.includes(body.name)){
  //     return response.status(400).json({
  //         error: 'person entry already exists'
  //       })
  // }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || 0
  }
  persons = persons.concat(person)
  response.json(person)
})
//________________________________________________
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
  {
    id: 1,
    name: "John Smith",
    number: '0221'
  },
  {
    id: 2,
    name: "Jane Doe",
    number: '0222'
  },
  {
    id: 3,
    name: "John Smith",
    number: '0223'
  },
  {
    id: 4,
    name: "Snoop Dogg",
    number: '0224'
  }
]
