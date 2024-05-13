require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

const PORT = process.env.PORT;

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number is missing'
    });
  }

  // TODO: fix this
  // if (persons.find((person) => person.name === name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   });
  // }

  const person = new Person({
    name,
    number
  });

  // TODO: error handling
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get('/api/persons/:id', (request, response) => {
  // TODO: handle 404
  // response.status(404).end();
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// TODO: implement delete route
// response.status(204).end();
app.delete('/api/persons/:id', (request, response) => {
  console.log('delete', request.params.id);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
