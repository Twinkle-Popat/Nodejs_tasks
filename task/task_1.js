//http://localhost:3000/task-1?number=20
const express = require('express');
const app = express();
const port = 3000;

const cache = {};

app.get('/task-1', (req, res) => {
  const number = parseInt(req.query.number);


  if (!Number.isInteger(number)) {
    res.status(400).send('Invalid number');
    return;
  }


  if (cache[number]) {
    console.log(`Cache hit: ${number}`);
    res.send(cache[number]);
    return;
  }

  

  const result = [];
  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('Fixtur');
    } else if (i % 3 === 0) {
      result.push('Fiz');
    } else if (i % 5 === 0) {
      result.push('nur');
    } else {
      result.push(i);
    }
  }

  
  const message = result.join(' ');

  
  cache[number] = message;

  res.send(message);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
