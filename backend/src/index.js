const express = require('express');
const routes = require('./routes'); //importa as rotas do routes

const app = express();

app.use(express.json());   //diz que as requisiçoes serao recebidas no formato json
app.use(routes);           // usa o arquivo de rotas routes


app.listen(3333);

