import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen( PORT, () => {
  console.log('Server run on port', PORT);
});
