const mongoose = require('mongoose');

module.exports = async () => {
  // TODO: Move constants to .env file.
  const uri =
    'mongodb+srv://Ahmed:123@firstcluster.qzo5s.mongodb.net/UsersDB?retryWrites=true&w=majority';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('mongoose connection started');
  });

  db.on('error', (err) => {
    console.log('mongoose error:', err);
    process.exit(1);
  });
};
