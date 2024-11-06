const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
    type: { type: String },
    location: { type: String },
    powerConsumption: { type: Number },
    controlMode: { type: String }
});

module.exports = mongoose.model('Appliance', applianceSchema);
