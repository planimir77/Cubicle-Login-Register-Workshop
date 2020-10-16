const Accessory = require('../models/Accessory');

const getAccessories = async (cubeId) => {
    try {
        const accessories = await Accessory.find({ cubes: { $in: cubeId, }, }).lean();
        return accessories;

    } catch (error) {
        console.error("Error: ", error);
    }
};

const getAvailableAccessories = async (cubeId) => {
    try {
        const accessories = await Accessory.find({ cubes: { $nin: cubeId, }, }).lean();
        return accessories;

    } catch (error) {
        console.error("Error: ", error);
    }
};

module.exports = { getAccessories, getAvailableAccessories, }