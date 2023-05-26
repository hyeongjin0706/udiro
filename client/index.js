import express from 'express';

const app = express();

app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
app.use(express.static('public'));


app.use((req, res, next) => {
    res.sendStatus(404)
});
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
});

app.listen(9000);