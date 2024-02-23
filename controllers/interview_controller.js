const Interview = require('../models/interviews'); // Getting Interview Model
const Student = require('../models/student'); // Getting Student Model

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

module.exports.addInterview = async function(req, res) {
    let {company, id, date} = req.body;
    try {
        let interview = await Interview.findOne({company: company, date: date});
        if(interview) {
            if(interview.students.find((student) => { return student.student.toString() === id})) {
                req.flash('error', "Interview for given student has already been scheduled");
            } else {
                let temp = await Interview.updateOne({_id: interview._id}, {
                    $push: {
                        students: {
                            student: id, 
                            result: "To Be Decided"
                        }
                    }
                });
                req.flash('info', "Interview has been added");
            }
        } else {
            let students = [{student: id, result: "To Be Decided"}], temp = await Interview.create({
                company: company,
                students: students,
                date: date
            });
            req.flash('info', "Interview has been added");
        }
        return res.redirect('back');
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    } 
}