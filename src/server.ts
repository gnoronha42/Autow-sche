import express, { json } from 'express';

const app = express();

app.use(json());

app.get('/', (req, res) => {
    res.json({ message: "Ola API" });
})

app.listen(3333, () => console.log('Server ON'));