const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.static("build"));

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const date = new Date();

const generateId = () => {
  return Math.ceil(Math.random() * 999);
};

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/info", (req, res) =>
  res.send(`<p>Phonebook has info for ${data.length} people</p><p>${date}</p>`)
);

app.get("/api/persons/:id", (req, res) => {
  const person = data.find((d) => d.id === Number(req.params.id));
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  data = data.filter((d) => d.id !== Number(req.params.id));
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  const existing = data.find((d) => d.name === person.name);
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: `${!person.name ? "Name" : "Number"} missing`,
    });
  } else if (existing) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  } else {
    const personObj = { ...person, id: generateId() };
    data = data.concat(personObj);
    res.json(personObj);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
