//Import dependencies
const express = require('express')
const router = express.Router()
const Pusher = require('pusher')

var pusher = new Pusher({
    app_id : "1246204",
    key :"12a4750b90a8d4561fc3",
    secret : "235a9352877300513a39",
    cluster:"eu",
    useTLS: true
});

router.get('/', (req, res)=>{
    res.send('POLL')
})

router.post('/', (req, res)=>{
    pusher.trigger('os-poll', '0s-vote', {
        points: 1,
        os: req.body.os
    })
    return res.json({success: true, message:'Thank you for voting'})
})

module.exports = router