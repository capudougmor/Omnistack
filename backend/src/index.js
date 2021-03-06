﻿const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //importa as rotas do routes
const { errors } = require('celebrate')

const app = express();

app.use(cors());  // seguranca
app.use(express.json());   //diz que as requisiçoes serao recebidas no formato json
app.use(routes);           // usa o arquivo de rotas routes
app.use(errors());


app.listen(3333);

