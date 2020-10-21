const { getCube, getCubes } = require('../controllers/cube-get');
const { createCube, updateCube } = require('../controllers/cube-set');
const createAccessory = require('../controllers/accessory-set');
const { getAccessories, getAvailableAccessories } = require('../controllers/accessory-get');
const { register, login , logout} = require('../controllers/user')
const checkAuth = require('../middlewares/check-auth');

module.exports = (app) => {
    app.get('/', async function (req, res) {
        const query = req.query;
        const cubes = await getCubes(query);
        res.render('index', { title: "Home page", cubes: cubes, });
    });

    app.get('/about', function (req, res) {
        res.render('about', { title: "About page", });
    });

    app.get('/details/:id', async function (req, res) {
        const cubeId = req.params.id;
        const cube = await getCube(cubeId);
        const accessories = await getAccessories(cubeId);
        res.render('details', { title: "Cube details", ...cube, accessories, });
    });

    // =================== Cube ==============================
    app.get('/create', function (req, res) {
        res.render('create', { title: "Create page", });
    });

    app.post('/create', async function (req, res) {
        const entry = req.body;
        await createCube(entry);
        res.redirect('/');
    });

    // ==================== Accessory ========================
    app.get('/create/accessory', function (req, res) {
        res.render('create-accessory', { title: "Create accessory", });
    });

    app.post('/create/accessory', async function (req, res) {
        const entry = req.body;
        await createAccessory(entry);
        res.redirect('/');
    });

    app.get('/attach/accessory/:id', async function (req, res) {
        const cubeId = req.params.id;
        const cube = await getCube(cubeId);
        const accessories = await getAvailableAccessories(cubeId);
        res.render('attach-accessory', { title: "Attach accessory", ...cube, accessories, });
    });

    app.post('/attach/accessory/:id', async function (req, res) {
        const cubeId = req.params.id;
        const { accessory } = req.body;

        await updateCube(cubeId, accessory);

        const cube = await getCube(cubeId);
        const accessories = await getAccessories(cubeId);

        res.redirect(`/details/${cubeId}`);
    });
    // ================= User =================
    //        Register
    app.get('/user/register', (req, res) => {
        res.render('register-page', { title: 'Register Form', });
    });
    app.post('/user/register', async (req, res) => {

        const success = await register(req, res);

        if (success) return res.redirect('/user/login');

        res.redirect('/user/register');
    });
    //        Login
    app.get('/user/login', (req, res) => {
        res.render('login-page', { title: 'Login Form', });
    })
    app.post('/user/login', checkAuth(false), async (req, res, next) => {
        const success = await login(req, res);
        if (success) {
            res.redirect('/');
        } else {
            res.render('login-page', { message: 'Wrong username or password', });
        }
    });
    //         Logout
    app.get('/logout', (req, res) => {
        
        logout(req, res);
        res.redirect('/');
    });

    // ================ Not found ========================
    app.get('*', function (req, res) {
        res.render('404', { title: "Not found", });
    });
};
