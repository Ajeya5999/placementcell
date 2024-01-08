module.exports.signUp = function(req, res) {
    return res.render('sign-up', {
        title: 'Sign Up',
        layout: './layouts/auth'
    });
}