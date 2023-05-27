import express from 'express';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
app.set('views', './public/ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// app.use("/culture", )

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(9000);
