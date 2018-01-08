const express = require('express')
const path = require('path')
const app = express();

app.use(express.static('dist'));

const port = process.env.PORT || 8080;

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function() {
  console.log(`Server is listening on 'http://localhost:${port}'`);
});
