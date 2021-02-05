/* eslint-disable */

const randomID = require('random-id')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (app, url, MongoClient, assert) => {


    app.post('/api/signin', (req, res) => {
        const email = req.body.email,
            pass = req.body.password
        MongoClient.connect(url)
        .then((client) => {
          let Users = client.db('lr3').collection('users')
          Users.findOne({email: email}, (err, user) => {
            if (err) {
              res.send("user not found")
            }
            if (user) {
              let hash = user.password
              console.log(hash)
              bcrypt.compare(pass, hash, (err, result) => {
                if (result) {
                  const SID = randomID()
                  Users.updateOne({_id: user._id}, {$push: {
                    session: {
                      date: new Date(),
                      session_id: SID
                    }
                  }}, (err, result) => {
                    if (err) {
                      res.send(err)
                    }
                    if (result) {
                      let data = {
                        email: user.email,
                        session_id: SID,
                        user_id: user._id,
                        preferences: user.preferences,
                        access: user.access,
                        username: user.username
                      }
                      res.send(data)
                    }
                  })
                } else {
                  res.send("Incorrect password")
                }
              })
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
      })
    
      app.post('/api/signup', (req, res) => {
        // Should this only be doable via an admin and in a dashboard?
        const email = req.body.email,
            pass = req.body.password,
            access = req.body.access,
            username = req.body.username
        MongoClient.connect(url)
        .then((client) => {
          let Users = client.db('lr3').collection('users')
          Users.findOne({email: email}, (err, user) => {
            if (err) {
              return
            }
            if (user) {
              res.send({message: "A user with that email already exists"})
            } else {
              bcrypt.hash(pass, saltRounds).then((hash) => {
                assert.equal(null,err)
                let Users = client.db('lr3').collection('users')
                Users.insertOne({
                  email: email,
                  password: hash,
                  username: username,
                  preferences: {
                    cardNotificationDays: 2,
                    colorSceme: 'light'
                  },
                  access: access,
                  created: new Date()
                }, (err, result) => {
                  if (err) {
                    res.send(err)
                  }
                  if (result) {
                    let data = {
                      user_id: result.insertedId,
                      email: email,
                      access: access,
                      username: username,
                      preferences: {
                        cardNotificationDays: 2,
                        colorSceme: 'light'
                      }
                    }
                    res.send(data)
                  }
                })
              })
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })  
      })

    app.post('/api/hello', (req, res) => {
        console.log(req.body)
        res.status(200).send({res: "hello", id: randomID(20)})
    })

}