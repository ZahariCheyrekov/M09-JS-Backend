const { User } = require('../models/User');

exports.login = () => {

}

exports.register = async (userData) => {
    await User.create(userData);
}