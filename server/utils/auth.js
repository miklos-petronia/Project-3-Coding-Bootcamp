require('dotenv').config();
const tknWb = require('jsonwebtoken');

const tokenUser = ({ _id, firstName, userName, userEmail }) =>
    tknWb.sign(
        { data: { _id, firstName, userName, userEmail } },
        process.env.TKN,
        { expiresIn: '1h' }
    );

module.exports = { tokenUser };