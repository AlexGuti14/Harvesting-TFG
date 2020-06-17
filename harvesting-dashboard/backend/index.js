
module.exports = (app) =>{
    app.use('/', require('./routes/root'));
    app.use('/historical', require('./routes/historical.router'));
    app.use('/cereal', require('./routes/cereal.router'));
};