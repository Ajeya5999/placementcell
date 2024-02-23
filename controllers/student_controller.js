const Student = require('../models/student'); //Getting student model

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
        return res.redirect('/');
    }
}

module.exports.showStudent = async function(req, res) {
    let studentId = req.params.id;
    try {
        let student = await Student.findById(studentId);
        if(student) {
            return res.render('curr_student', {
                title: "Current Student",
                student: student
            });
        } else {
            req.flash('error', "Student does not exist");
            return res.redirect('back');
        }
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.updateStudent = async function(req, res) {
    let {name, email, batch, college, status, dsa_score, webd_score, react_score} = req.body, id = req.params.id;
    try {
        let currStudent = await Student.findById(id);
        if(currStudent) {
            let temp = await Student.updateOne({_id: id}, {
                name: (name) ? name : currStudent.name,
                email: (email) ? email : currStudent.email,
                batch: (batch) ? batch : currStudent.batch,
                college: (college) ? college : currStudent.college,
                status: (status) ? status : currStudent.status,
                dsa_score: (dsa_score) ? dsa_score : currStudent.dsa_score,
                webd_score: (webd_score) ? webd_score : currStudent.webd_score,
                react_score: (react_score) ? react_score : currStudent.react_score 
            });
            req.flash('info', "Student has been updated");
        } else {
            req.flash('error', "Student does not exist");
        }
        return res.redirect('back');
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.deleteStudent = async function(req, res) {
    let id = req.params.id;
    try {
        let temp = await Student.findByIdAndDelete(id);
        req.flash('info', "Student has been deleted");
        return res.redirect("/dashboard/student");
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}