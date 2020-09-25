const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Photo = require('./photo')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 7;

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true, lowercase: true},
    password: String,
    photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
    favDates: {type: [Date], default:['09/20/2020', '10/22/1999', '09/25/2020']},
    gId: String,
    gName: String,
    // gEmail: String,
    token: String,
    gRefreshToken: String,
    profile: Object,
    albums: [{type: Schema.Types.ObjectId, ref: 'Album'}]
}, {timestamps: true})

userSchema.set('toJSON', {
    transform: function(doc, returned) {
        delete returned.password
        return returned
    }
})
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

userSchema.methods.checkPW = function(tryPW, done) {
    bcrypt.compare(tryPW, this.password, done)
}



module.exports = mongoose.model('User', userSchema)