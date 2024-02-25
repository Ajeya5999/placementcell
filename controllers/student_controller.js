const Student = require('../models/student'); //Getting student model
const Interview = require('../models/interviews'); //Getting interview model
const json2csv = require('json2csv').parse; //Getting json2csv for converting data to CSV
const fs = require('fs'); //Getting fs for file management

module.exports.student = async function(req, res) { //render student page
    let studentList;
    try {
        studentList = await Student.find({})
        .select('_id name email batch college status dsa_score webd_score react_score')
        .exec();
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

module.exports.addStudent = async function(req, res) { //adds student to student list
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

module.exports.showStudent = async function(req, res) { //shows detials of a perticular student
    let studentId = req.params.id;
    try {
        let student = await Student.findById(studentId)
        .select('_id name email batch college status dsa_score webd_score react_score')
        .exec();
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

module.exports.updateStudent = async function(req, res) { //upadting student details
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

module.exports.deleteStudent = async function(req, res) { //delete student from list
    let id = req.params.id;
    try {
        let temp1 = await Student.findByIdAndDelete(id);
        let interviews = await Interview.find({});
        for(interview of interviews) {
            if(interview.students.find((student) => { return student.student.toString() === id})) {
                let temp2 = await Interview.findByIdAndUpdate(interview._id, {
                    $pull: {
                        students: {student: id}
                    }
                });
            }
        }
        req.flash('info', "Student has been deleted");
        return res.redirect("/dashboard/student");
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.saveStudentsList = async function(req, res) { //downloading student data
    try { 
        const students = await Student.find({})
        .populate('interviews.interview', 'company date')
        .exec(),
        fields = ['id', 'name', 'email', 'batch', 'college', 'status', 'dsa_score', 'webd_score', 'react_score', 'interviews'],
        csv = json2csv(students, {fields});
        fs.writeFile('Students.csv', csv, (err) => {
            if(err) {
                console.log("error", err);
                res.redirect('/');
            }
            else {
                return res.render('download', {
                    title: "Download Student"
                });
            }
        });
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}