/*
var fs = require('fs');
let username = fs.readFileSync(process.env.MONGO_USERNAME_FILE, 'utf8');
username = username.replace(/(\r\n|\n|\r)/gm, "");
let password = fs.readFileSync(process.env.MONGO_PASSWORD_FILE, 'utf8');
password = password.replace(/(\r\n|\n|\r)/gm, "");
const database = process.env.MONGO_DATABASE;
const hostname = process.env.MONGO_HOSTNAME;
*/
const mongoose = require('mongoose');
//const uri = `mongodb://harvesting-mongodb:27017/DataHub`;
const uri = 'mongodb://lonjaPorcino:B8otn2BSeLNUrRr9tp8k@51.210.10.251:64215/lonjaporcino';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var connectWithRetry = function() {
  return mongoose.connect(uri, function(err) {
    if (err) {
      console.error('Failed to connect to server ' + uri + ' on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${uri}`);
});
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log(`Mongoose disconnected through ${msg}`);
		callback();
	});
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});

module.exports = mongoose.connection;
