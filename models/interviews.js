const mongoose = require('mongoose');

//Student Schema

const interviewSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        result: {
            type: String,
            required: true
        },
        _id: false
    }],
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

interviewSchema.index({
    company: 1,
    date: 1
}, {unique: true});

//Compiling the Schema into a Model

const interview = mongoose.model('Interview', interviewSchema);

module.exports = interview;