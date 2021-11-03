const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
            /// console.log(token);
        const decoded = jwt.verify(token, 'thisismynewcourses')
        const user = await User.findOne({ _id: (decoded._id).toString(), 'tokens.token': token });
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please aunthicate.' });
    }
}
module.exports = auth