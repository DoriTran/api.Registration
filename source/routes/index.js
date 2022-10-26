const accoutRoute = require('./account')

const route = app => {
    app.get('/api', (req, res)=>{
        res.send("Welcome to Registration api.")
    })
    app.use('/api/auth', accoutRoute)
}

module.exports = route