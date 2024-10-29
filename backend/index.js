import express from 'express';
import Database from './database/db.js';
const app = express()
const port = process.env.PORT || 5000;
import cors from 'cors';

//routes
import auth from './routes/auth.js';
import task from './routes/task.js';

//middleware
app.use(express.json());
app.use(cors());

//database
Database();

app.get('/', (req, res) => {
  res.send('Hello Woorld!')
});



//routes
app.use('/api/auth',auth);
app.use('/api/task',task);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


