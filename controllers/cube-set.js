const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const createCube = async (entry) => {
    try {
        const newCube = new Cube({
            'name': entry.name,
            'description': entry.description,
            'imageUrl': entry.imageUrl,
            'difficultyLevel': entry.difficultyLevel,
        });

        const cube = await newCube.save();
        //when success it print.
        console.log(cube.toObject());

    } catch (error) {
        console.error("Error: ", error.message);
    }

    // Create and save a Cube in local storage database.json 
    // const cube = Object.assign(new Cube(), entry);
    // cube.save();
};

const updateCube = async (cubeId, accessoryId) => {
    try {
        await Cube.findByIdAndUpdate(cubeId, {
            $push: { accessories: accessoryId, },
        });
        await Accessory.findByIdAndUpdate(accessoryId, {
            $push: {cubes: cubeId,},
        });
        
    } catch (error) {
        console.error('Error: ' + error);
    }
}

module.exports = { createCube, updateCube, };