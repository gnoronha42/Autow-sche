import express, { json } from 'express';

import router from './routes'

const app = express();

app.use(json());
app.use(router);

app.get('/', (req, res) => {
    res.json({ message: "Ola API" });
})

app.listen(3333, () => console.log('Server ON'));