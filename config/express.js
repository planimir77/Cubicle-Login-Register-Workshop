const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = (app, express) => {
    
    // Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs',
    }));
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true,}));
    app.use(auth);

    // Setup the static files
    app.use('/static', express.static('static'));
};
