const express = require('express');
const Path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(Path.join(__dirname + '/public')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});