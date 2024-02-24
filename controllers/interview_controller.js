const Interview = require('../models/interviews'); // Getting Interview Model
const Student = require('../models/student'); // Getting Student Model

module.exports.interviews = async function(req, res) {
    let studentList, interviewList;
    try {
        studentList = await Student.find({})
        .select('_id email')
        .exec();
        interviewList = await Interview.find({})
        .select('_id company date')
        .exec();
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
                let temp1 = await Interview.updateOne({_id: interview._id}, {
                    $push: {
                        students: {
                            student: id, 
                            result: "To Be Decided"
                        }
                    }
                }),
                temp2 = await Student.findByIdAndUpdate(id, {
                    $push: {
                        interviews: {
                            interview: interview._id,
                            result: "To Be Decided"
                        }
                    }
                });
                req.flash('info', "Interview has been added");
            }
        } else {
            let students = [{student: id, result: "To Be Decided"}], temp1 = await Interview.create({
                company: company,
                students: students,
                date: date
            });
            interview = await Interview.findOne({company: company, date: date})
            .select('_id')
            .exec();
            let temp2 = await Student.findByIdAndUpdate(id, {
                $push: {
                    interviews: {
                        interview: interview._id,
                        result: "To Be Decided"
                    }
                }
            });
            req.flash('info', "Interview has been added");
        }
        return res.redirect('back');
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    } 
}

module.exports.showInterview = async function(req, res) {
    let interviewId = req.params.id;
    try {
        let interview = await Interview.findById(interviewId)
        .populate('students.student', 'email')
        .exec();
        if(interview) {
            return res.render('curr_interview', {
                title: "Current Interview",
                interview: interview
            });
        } else {
            req.flash('error', "Interview does not exist");
            return res.redirect('back');
        }
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.updateInterview = async function(req, res) {
    let studentId = req.body.id, interviewId = req.params.id;
        try {
            if(studentId) {
                let temp1 = await Interview.findByIdAndUpdate(interviewId, {
                    $set: {
                        "students.$[element].result": req.body.result
                    }
                }, {
                    arrayFilters: [
                        {"element.student": studentId}
                    ]
                });
                let temp2 = await Student.findByIdAndUpdate(studentId, {
                    $set: {
                        "interviews.$[element].result": req.body.result
                    }
                }, {
                    arrayFilters: [
                        {"element.interview": interviewId}
                    ]
                });
                req.flash('info', "Interview result for student has been updated");
            } else {
                req.flash('error', "Student was not selected");
            }
            return res.redirect('back'); 
        } catch(err) {
            console.log("error", err);
            return res.redirect('/');
        }
}

module.exports.removeStudent = async function(req, res) {
    let studentId = req.body.id, interviewId = req.params.id;
    if(studentId) {
        try {
            let temp1 = await Interview.findByIdAndUpdate(interviewId, {
                $pull: {
                    students: {student: studentId}
                }
            });
            let temp2 = await Student.findByIdAndUpdate(studentId, {
                $pull: {
                    interviews: {interview: interviewId}
                }
            });
            req.flash('info', "Student has been removed from the interview");
        } catch(err) {
            console.log("error", err);
            return res.redirect('/');
        }
    } else {
        req.flash('error', "Student was not selected");
    }
    return res.redirect('back');
}

module.exports.deleteInterview = async function(req, res) {
    let id = req.params.id;
    try {
        let temp1 = await Interview.findByIdAndDelete(id);
        let students = await Student.find({});
        for(student of students) {
            if(student.interviews.find((interview) => { return interview.interview.toString() === id})) {
                let temp2 = await Student.findByIdAndUpdate(student._id, {
                    $pull: {
                        interviews: {interview: id}
                    }
                });
            }
        }
        req.flash('info', "Interview was deleted");
        return res.redirect('/dashboard/interview');
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}