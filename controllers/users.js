const User = require('../models/user')

const combineGTokenUser = (req, res) => {
    console.log(`in the backkkkk combine with gId ${req.body.gId}`)
    User.findOneAndDelete({ gId: req.body.gId }, (err, user) => {
        if (user) User.findOneAndUpdate({ _id: req.body.userId }, { gId: user.gId, gName: user.gName, token: user.token, gRefreshToken: user.gRefreshToken, profile: user.profile }, {useFindAndModify: false, new: true})
                    .then(userUpdated => {
                        if (userUpdated.photos.length > 0) {
                            userUpdated.populate('photos')
                            .then(comboUser => {
                            console.log(comboUser.gName, comboUser.name)
                            res.status(201).json({ comboUser })
                            })
                        } else {
                            res.status(201).json({ comboUser: userUpdated })
                        }
                    })
    })
}

module.exports = { combineGTokenUser }