const { getCube, getCubes } = require('../controllers/cube-get');
const { createCube, updateCube } = require('../controllers/cube-set');
const createAccessory = require('../controllers/accessory-set');
const { getAccessories, getAvailableAccessories } = require('../controllers/accessory-get');

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

    // ---------------- Not found ----------------------------
    app.get('*', function (req, res) {
        res.render('404', { title: "Not found", });
    });
};
