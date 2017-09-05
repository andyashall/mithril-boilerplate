const randomID = require('random-id')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (app, url, MongoClient, assert) => {

    app.post('/api/hello', (req, res) => {
        console.log(req.body)
        res.status(200).send("hello " + randomID(20))
    })

}