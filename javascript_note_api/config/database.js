const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://0.0.0.0/javascriptNote', {
  useNewUrlParser: true,
  useUnifiedTopology: true // indexed content
  // useCreateIndex: true // create index automatically

}).then(() => console.log('Conection successful'))
  .catch((err) => console.log(err));

