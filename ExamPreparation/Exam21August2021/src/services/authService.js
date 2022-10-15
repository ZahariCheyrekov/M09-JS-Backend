const User = require('../models/User.js');

exports.login = () => {

}

exports.register = async (userData) => {
    await User.create(userData);
}