const express = require('express')
const path = require('path');
const bodyParser= require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
var compression = require('compression');
const db = require('./database')
const app = express();
var cors = require('cors')

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
    }
}));

var whitelist = ['http://localhost:3000','http://localhost:8081','http://192.168.99.100:8081','http://192.168.99.100:8080','http://lonjaporcino.ddns.net','https://lonjaporcino.ddns.net', 'http://lonjaporcino.unizar.es', 'https://lonjaporcino.unizar.es', '51.210.10.251:80']
var corsOptions = {
    /*
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    */
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
}

// serve swagger
app.get('/swagger.json', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

app.use(cors(corsOptions))
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//Routing
require('./index')(app);

///////////////SWAGGER///////////////
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
	openapi: '3.0.1',
	info: {
		title: 'API Harvesting Data',
		version: '1.0.0',
		description: 'Harvesting Service API Description'
	},
	host: '51.210.10.251:7081',
	basePath: '/',
	schemes: ['http', 'https']
};
// options for the swagger docs
var options = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: ['./routes/*.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
