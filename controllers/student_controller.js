const Student = require('../models/student'); //Getting student model

module.exports.addStudent = async function(req, res) {
    let temp1 = req.body;
    try {
        let student = await Student.find({email: temp1.email});
        if (student.length != 0) {
            req.flash('error', "Student with the entered email already exists");
            return res.redirect('back');
        } 
        let temp2 = await Student.create(temp1);
        req.flash('info', "Student has been added");
        return res.redirect('back');
    } catch(err) {
        console.log("error", err);
    }
}