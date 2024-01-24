module.exports.student = function(req, res) {
    return res.render('student', {
        title: "Student List"
    });
};

module.exports.interviews = function(req, res) {
    return res.render('student', {
        title: "Interviews"
    });
};

module.exports.listinngs = function(req, res) {
    return res.render('student', {
        title: "Job Listings"
    });
};