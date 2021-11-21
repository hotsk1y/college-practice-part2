const express = require('express');
const app = express();

const users = [
  {
    name: "Hotskyi",
    age: "18",
  },
  {
    name: "Trump",
    age: "19",
  },
];

app.get('/', (req, res) => {
  res.json(users);
})

app.listen(3000);