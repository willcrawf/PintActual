const mongoose = require('mongoose')
var _db, usersColln, photosColln

module.exports = { 
    connectToServer: function(cb) {
        mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err, client) => {
            _db = client.db
            usersColln = _db.collection('users')
            photosColln = _db.collection('photos')
        })
        const dbOnes = mongoose.connection
        dbOnes.on('connected', () => console.log(`connected to MongoDB Ones at ${dbOnes.host}:${dbOnes.port}`))
    },
    getDb: function() {return _db},
    usersColln: function() {return usersColln}, 
    photosColln: function() {return photosColln} 
}
// const dbTwos = mongoose.createConnection(process.env./*--your typetwo MongoDB URI name from .env---*/, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

// dbTwos.on('connected', () => console.log(`connected to MongoDB Twos at ${dbTwos.host}:${dbTwos.port}`))
