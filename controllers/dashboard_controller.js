const Student = require('../models/student'); // Getting Student Model
const Interview = require('../models/interviews'); // Getting Interviews Model

module.exports.student = async function(req, res) {
    let studentList;
    try {
        studentList = await Student.find({});
        return res.render('students', {
            title: "Student List",
            student_list: studentList
        });
    }
    catch(err) {
        console.log(err);
        return res.redirect('/');
    }
};

module.exports.interviews = async function(req, res) {
    let studentList, interviewList;
    try {
        studentList = await Student.find({}).select('_id email');
        interviewList = await Interview.find({});
        return res.render('interviews', {
            title: "Interviews",
            student_list: studentList,
            interview_list: interviewList
        });
    }
    catch(err) {
        console.log(err);
        return res.redirect('/');
    }
};

module.exports.listinngs = function(req, res) {
    return res.render('job-listing', {
        title: "Job Listings"
    });
};