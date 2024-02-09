const Student = require('../models/student'); // Getting Student Model

module.exports.student = async function(req, res) {
    let studentList;
    try {
        studentList = await Student.find({});
        return res.render('student', {
            title: "Student List",
            student_list: studentList
        });
    }
    catch(err) {
        console.log(err);
        return res.redirect('/');
    }
};

module.exports.interviews = function(req, res) {
    return res.render('interview', {
        title: "Interviews"
    });
};

module.exports.listinngs = function(req, res) {
    return res.render('job-listing', {
        title: "Job Listings"
    });
};