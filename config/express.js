const handlebars = require('express-handlebars');

module.exports = (app, express) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs',
    }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded());
    //app.set(express.urlencoded({extended: true}));

    //TODO: Setup the static files
    app.use('/static', express.static('static'));
};
