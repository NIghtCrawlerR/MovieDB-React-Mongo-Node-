const User = require('../models/user.model')
const checkAccess = (userId, group) => {
    
    return User.find({ _id: userId }, (err, user) => {
        if (err) {
            return {
                succes: false,
                message: 'Error: Server error. ' + err
            }
        }
        const hasAccess = user[0].group === group
        console.log('hasAccess', hasAccess)
        return hasAccess
    })

}
module.exports = checkAccess