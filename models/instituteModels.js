const mongoose = require("mongoose")

const instituteSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
    },
    instituteAddress: {
        type: String,
        required: true,
    },
    instituteShortName: {
        type: String,
        required: true,
    },
    institutePhoneNumber: {
        type: Number,
    }
})

const InstituteModel = mongoose.model('institute', instituteSchema);

module.exports = InstituteModel