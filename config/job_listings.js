const fetch = require('node-fetch'); //Getting node's fetch function 
require('dotenv').config(); //Getting environment variables 

module.exports.getJobs = async function() {
    const url = process.env.MUSE_API_URL;
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch(err) {
        console.log('error', err);
    }
}