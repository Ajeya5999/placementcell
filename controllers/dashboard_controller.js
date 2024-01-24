module.exports.student = function(req, res) {
    return res.render('student', {
        title: "Student List"
    });
};