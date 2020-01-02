const User = require('../models/user.model')

module.exports = checkAccess = (req, res, next) => {
    let groupsPermissions = {}
    process.env.USER_GROUPS.split('///').map(group => {
        groupsPermissions[group.split('//')[0]] = group.split('//')[1]
    })

    const { userId } = req.query;

    User.find({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).json({ 'status': 'error', 'text': 'Error: Server error' });
        }

        if (!groupsPermissions) res.status(500).json({ 'status': 'error', 'text': 'Error: Data not found' });

        const userGroup = user[0].group;
        const hasAccess = userGroup === "admin";
        
        if (hasAccess) next();
        else res.status(403).json({ 'status': 'error', 'text': 'Error: You have no permission.', 'accessError': true });
    })
}
