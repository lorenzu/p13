import express from 'express';
import './mongoose.js';
import Card, { Carta } from './Carta.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/card', (req, res) => {
  const carta = new Card(req.body);

  carta.save().then((carta) => {
    res.status(200).send(carta);
  }).catch((error) => {
    res.status(404).send(error);
  });
});

app.delete('/card', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    Card.findOneAndDelete({nombre: req.query.title.toString()}).then((carta) => {
      if (!carta) {
        res.status(404).send();
      } else {
        res.send(carta);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});