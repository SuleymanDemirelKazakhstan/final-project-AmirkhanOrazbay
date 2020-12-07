const express = require('express');
const bodyParser = require('body-parser');
const handlebarsExp = require('express-handlebars');
const handlebars = handlebarsExp.create();

const app = express();
const router = require('./router');

const PORT = process.env.PORT || 8080;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(router.router);

app.listen(PORT, () => console.log(`listen ${PORT}`));