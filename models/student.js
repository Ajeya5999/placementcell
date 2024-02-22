const mongoose = require('mongoose');

//Student Schema

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dsa_score: {
        type: Number,
        required: true
    },
    webd_score: {
        type: Number,
        required: true
    },
    react_score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

//Compiling the Schema into a Model

const student = mongoose.model('Student', studentSchema);

module.exports = student;