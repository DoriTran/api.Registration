const accountRoute = require('./account')

const route = app => {
    app.get('/api', (req, res)=>{
        res.send("Welcome to Registration api.")
    })
    app.use('/account', accountRoute)
}

module.exports = route