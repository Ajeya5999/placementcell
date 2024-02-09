const Student = require('../models/student'); //Getting student model

module.exports.addStudent = async function(req, res) {
    let temp1 = req.body;
    try {
        let temp2 = await Student.create(temp1);
        req.flash('info', "Student has been Added");
        return res.redirect('back');
    } catch(err) {
        console.log("error", err);
    }
}