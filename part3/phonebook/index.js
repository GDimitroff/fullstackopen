const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3001;

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

morgan.token('post-body', (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-body'
  )
);
app.use(express.static('dist'));

app.get('/info', (request, response) => {
  const date = new Date();

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number is missing'
    });
  }

  if (persons.find((person) => person.name === name)) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000),
    name,
    number
  };

  persons = [...persons, person];
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
