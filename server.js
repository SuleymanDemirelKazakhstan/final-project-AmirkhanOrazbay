const express = require('express');
const bodyParser = require('body-parser');
const handlebarsExp = require('express-handlebars');
const handlebars = handlebarsExp.create();

const app = express();
const router = require('./router');

const port = 3000;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(router.router);

app.listen(port, () => console.log(`listen ${port}`));