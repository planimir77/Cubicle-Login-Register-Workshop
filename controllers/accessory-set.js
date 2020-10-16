const mongoose = require('mongoose');
const Accessory = require('../models/Accessory');

module.exports =  async (entry) => {
    try {
        const accessory = new Accessory(entry);
        const result = await accessory.save();
        console.log(result.toObject());
    } catch (error) {
        console.error(error.massage);
    }
};