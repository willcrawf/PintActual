const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {

}

const signup = (req, res) => {
    try {
        User.create(req.body, (err, user) => {
            user.populate('photos', (err, user) => {
                const token = createJwt(user)
                res.json({ token })
            })
        })
    } catch (err) {res.status(400).send({ 'err': err.errmsg })}
}

const login = ({ body }, res) => {
    try {
        User.findOne({ email: body.email }, (err, user) => {
            if (!user) return res.status(401).json({ err: 'bad creds' })
            user.checkPW(body.password, (err, isMatch) => {
                if (isMatch) {
                    user.populate('photos', (err, user) => {
                        const token = createJwt(user)
                        res.json({ token })
                    })
                } else {
                    res.status(401).json({ err: 'bad creds' })
                }
            })
        })
    } catch (err) {res.status(401).json(err)}
}

const updateUser = async (req, res) => {
    console.log(`in the backend update user google user`)
    const { gId, user } = req.body
    const gUser = await User.findOneAndDelete({ gId: gId })
    console.log('from backend update user' + gUser.gId)
    const comboUser = await User.findOneAndUpdate({ _id: user._id }, { gId: gUser.gId, gName: gUser.gName, token: gUser.token, gRefreshToken: gUser.gRefreshToken, profile: gUser.profile}, {new: true})
    console.log(`made combo user; name ${comboUser.name} and gId ${comboUser.gId}`)
    const token = createJwt(comboUser)
    res.json({ token })

}

const updateTokenUser = (req, res) => {
    console.log('in the update token user bbbbbbbbb')
    try {
        User.findOne({ _id: req.params.userId })
           .populate('photos')
            .then(user => {
                if (user.albums.length) {
                    User.populate(user, 'albums')
                    .then(userA => {
                        const token = createJwt(userA)
                        res.json({ token })
                    })
                } else {
                    const token = createJwt(user)
                    res.json({ token })
                }
            })
            .catch(err => console.log('pop err  ' + err))
    } catch (err) {res.status(401).json(err)}
} 

function createJwt(user) {
    return jwt.sign(
        {user},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}

module.exports = { getUser, signup, login, updateUser, updateTokenUser }