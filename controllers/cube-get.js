const Cube = require('../models/Cube');

// from local storage database.json
// const fs = require('fs');
// const path = require('path');
// const databaseJSON = path.join(__dirname, '../config/database.json');

// const data = fs.readFileSync(databaseJSON);
// const cubes = Array.from(JSON.parse(data));


const getCube = async (id) => {
    try {
        const cube = await Cube.findById(id);
        console.log(cube.toObject());

        return cube.toObject();
    } catch (error) {
        console.error('Error :', error.massage);
    }
    // from local storage database.json
    // const cube = cubes.filter(cube => cube.id == id);
    // return cube;
};

const getCubes = async (query) => {

    try {
        const cubes = await Cube.find({}).lean();
        console.log("Cubes: ", cubes);
        return cubes;
        
    } catch (error) {
        console.error("Error: ", error);
    } 

    // Get filtered Cubes from database.json
    // if (query.from && query.to) {
    //     const cubesFiltered = cubes.filter(cube =>
    //         cube.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()) &&
    //         Number(cube.difficultyLevel) >= Number(query.from) &&
    //         Number(cube.difficultyLevel) <= Number(query.to));

    //     return cubesFiltered;
    // }

    //return cubes;
};

module.exports = { getCube, getCubes, };
