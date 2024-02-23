module.exports.listinngs = function(req, res) {
    return res.render('job-listing', {
        title: "Job Listings"
    });
};