require('dotenv').config();
const tknWb = require('jsonwebtoken');

const tokenUser = ({ _id, firstName, userName, userEmail, userPwd, question, answer }) =>
    tknWb.sign(
        { data: { _id, firstName, userName, userEmail, userPwd, question, answer } },
        process.env.TKN,
        { expiresIn: '1h' }
    );

module.exports = { tokenUser };