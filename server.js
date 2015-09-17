var app  = require('express')();

app.listen(6000, function(err) {
  if(err) {
    throw err;
  }
  console.log('Server started on port 6000');
});

module.exports = app;