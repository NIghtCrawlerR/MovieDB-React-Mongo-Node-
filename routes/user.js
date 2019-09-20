module.exports = (function(){
    const express = require('express')
    const router = express.Router();
    
    router.route('/').post((req, res) => {
        console.log(req.body)
        return 
    })
    

    return router
})()