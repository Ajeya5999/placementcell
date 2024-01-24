const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signUp = function(req, res) {
    return res.render('sign-up', {
        title: 'Sign Up',
        layout: './layouts/auth'
    });
}

module.exports.create = async function(req, res) {
    let temp1 = req.body;
    if(temp1.password != temp1.confirm_password) {
        console.log("The password is not confirmed");
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: temp1.email});
        if(!user) {
            let {name, email, password} = temp1, hashPassword = await bcrypt.hash(password, 10);
            let temp2 = await User.create({
                name: name,
                email: email,
                password: hashPassword
            });
            return res.redirect('/users/sign-in');
        }
        else {
            console.log("User already exists!");
            return res.redirect('back');
        }
    } catch(err) {
        console.log("error", err);
    }
}

module.exports.signIn = function(req, res) {
    return res.render('sign-in', {
        title: 'Sign In',
        layout: './layouts/auth'
    });
}

module.exports.createSession = function(req, res){
    console.log("logged in");
    req.flash('message', "logged in");
    return res.redirect('/');
};