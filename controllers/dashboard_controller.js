const jobListings = require('../config/job_listings');

module.exports.listinngs = async function(req, res) {
    let jobs = await jobListings.getJobs();
    return res.render('job_listing', {
        title: "Job Listings",
        jobs: jobs
    });
};